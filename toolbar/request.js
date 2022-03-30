export default class Request
{
	constructor(data) {
		this.id = data.id

		this.responseDuration = Math.round(parseFloat(data.responseDuration))
		this.memoryUsage = this.formatBytes(data.memoryUsage)

		this.cache = this.resolveCache(data)
		this.database = this.resolveDatabase(data)
		this.events = this.resolveEvents(data)
		this.log = this.resolveLog(data)
		this.models = this.resolveModels(data)
		this.notifications = this.resolveNotifications(data)
		this.queueJobs = this.resolveQueueJobs(data)
		this.redisCommands = this.resolveRedisCommands(data)
		this.views = this.resolveViews(data)

		this.performanceMetrics = this.resolvePerformanceMetrics(data)
		this.clientMetrics = this.resolveClientMetrics(data)
		this.webVitals = this.resolveWebVitals(data)

		this.errorsCount = this.getErrorsCount(data)
		this.warningsCount = this.getWarningsCount(data)
	}

	isClientError() {
		return this.responseStatus >= 400 && this.responseStatus < 500
	}

	isServerError() {
		return this.responseStatus >= 500 && this.responseStatus < 600
	}

	resolveCache(data) {
		let deletes = parseInt(data.cacheDeletes)
		let hits = parseInt(data.cacheHits)
		let reads = parseInt(data.cacheReads)
		let writes = parseInt(data.cacheWrites)

		return {
			queries: {
				deletes, hits, reads, writes,
				total: deletes + hits + reads + writes
			},
			time: data.cacheTime
		}
	}

	resolveDatabase(data) {
		let queries = this.enforceArray(data.databaseQueries)

		let total = parseInt(data.databaseQueriesCount) || queries.length
		let slow = parseInt(data.databaseSlowQueries)
			|| queries.filter(query => query.tags && query.tags.includes('slow')).length
		let selects = parseInt(data.databaseSelects)
			|| queries.filter(query => query.query.match(/^select /i)).length
		let inserts = parseInt(data.databaseInserts)
			|| queries.filter(query => query.query.match(/^insert /i)).length
		let updates = parseInt(data.databaseUpdates)
			|| queries.filter(query => query.query.match(/^update /i)).length
		let deletes = parseInt(data.databaseDeletes)
			|| queries.filter(query => query.query.match(/^delete /i)).length
		let others = parseInt(data.databaseOthers)
			|| queries.filter(query => ! query.query.match(/^(select|insert|update|delete) /i)).length

		return {
			queries: { total, slow, selects, inserts, updates, deletes, others },
			time: Math.round(data.databaseDuration)
		}
	}

	resolveEvents(data) {
		return this.enforceArray(data.events).length
	}

	resolveLog(data) {
		return this.enforceArray(data.log).length
	}

	resolveModels(data) {
		let retrieved = Object.values(data.modelsRetrieved).reduce((sum, count) => sum + count, 0)
		let created = Object.values(data.modelsCreated).reduce((sum, count) => sum + count, 0)
		let updated = Object.values(data.modelsUpdated).reduce((sum, count) => sum + count, 0)
		let deleted = Object.values(data.modelsDeleted).reduce((sum, count) => sum + count, 0)

		return {
			retrieved, created, updated, deleted,
			total: retrieved + created + updated + deleted
		}
	}

	resolveNotifications(data) {
		return this.enforceArray(data.notifications).length
			+ Object.values(this.optionalNonEmptyObject(data.emailsData, {})).length
	}

	resolveQueueJobs(data) {
		return this.enforceArray(data.queueJobs).length
	}

	resolveRedisCommands(data) {
		return this.enforceArray(data.redisCommands).length
	}

	resolveViews(data) {
		return Object.values(this.optionalNonEmptyObject(data.viewsData, {})).length
	}

	resolveClientMetrics(data) {
		data = data.clientMetrics || {}

		return [
			{ name: 'Redirect', value: data.redirect },
			{ name: 'DNS', value: data.dns, color: 'purple', onChart: true },
			{ name: 'Connection', value: data.connection, color: 'blue', onChart: true },
			{ name: 'Waiting', value: data.waiting, color: 'red', onChart: true },
			{ name: 'Receiving', value: data.receiving, color: 'green', onChart: true },
			{ name: 'To interactive', value: data.domInteractive, color: 'blue', onChart: true, dom: true },
			{ name: 'To complete', value: data.domComplete, color: 'purple', onChart: true, dom: true }
		]
	}

	resolvePerformanceMetrics(data) {
		data = data.performanceMetrics

		if (! data) {
			return [
				{ name: 'App', value: (this.responseDuration) - (this.database.time) - (this.cache.time), color: 'blue' },
				{ name: 'DB', value: this.database.time, color: 'red' },
				{ name: 'Cache', value: this.cache.time, color: 'green' }
			].filter(metric => metric.value > 0)
		}

		data = data.filter(metric => metric instanceof Object)
			.map((metric, index) => {
				metric.color = metric.color || 'purple'
				return metric
			})

		let metricsSum = data.reduce((sum, metric) => { return sum + metric.value }, 0)

		data.push({ name: 'Other', value: this.responseDuration - metricsSum, color: 'purple' })

		return data
	}

	resolveWebVitals(data) {
		data = data.webVitals

		let vitals = {
			cls: { slow: 7300, moderate: 3800 },
			fid: { slow: 300, moderate: 100 },
			lcp: { slow: 4000, moderate: 2000 },
			fcp: { slow: 4000, moderate: 2000 },
			ttfb: { slow: 600, moderate: 600 },
			si: { slow: 5800, moderate: 4300 }
		}

		Object.keys(vitals).forEach(key => {
			let value = data[key]
			let score = 'fast'
			let available = value !== undefined

			if (value > vitals[key].slow) score = 'slow'
			else if (value > vitals[key].moderate) score = 'moderate'

			data[key] = { value, score, available }
		})

		return data
	}

	getErrorsCount(data) {
		return data.log.reduce((count, message) => {
			return message.level == 'error' ? count + 1 : count
		}, 0)
	}

	getWarningsCount(data) {
		return data.log.filter(message => message.level == 'warning').length
			+ this.database.queries.slow
	}

	formatBytes(bytes) {
		let units = [ 'B', 'kB', 'MB', 'GB', 'TB', 'PB' ]
		let pow = Math.floor(Math.log(bytes) / Math.log(1024))

		return `${Math.round(bytes / Math.round(Math.pow(1024, pow)))} ${units[pow]}`
	}

	enforceArray(input) {
		return input instanceof Array ? input : []
	}

	optionalNonEmptyObject(input, defaultValue) {
		return input instanceof Object && Object.keys(input).filter(key => key != '__type__').length ? input : defaultValue
	}
}
