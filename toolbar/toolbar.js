import icons from './icons'
import Request from './request'
import styles from './styles'

export default class Toolbar
{
	constructor() {
		this.requestId = this.readCookie('clockwork_id')
		this.path = this.readCookie('clockwork_path', '/__clockwork/')
	}

	show() {
		fetch(`${this.path}${this.requestId}`)
			.then(request => request.json())
			.then(request => this.render(new Request(request)))
	}

	render(request) {
		let html = `
			<div class="clockwork-toolbar">
				${this.renderStatusSection(request)}

				${this.renderSection({
					name: 'Performance',
					icon: 'activity',
					values: [
						{ name: 'Response time', value: request.responseDuration, unit: 'ms' },
						{ name: 'Memory usage', value: request.memoryUsage }
					],
					popover: [
						{ name: 'Response time', value: request.responseDuration, unit: 'ms' },
						{ name: 'Memory', value: request.memoryUsage },
						...request.performanceMetrics.map(m => Object.assign({ unit: 'ms' }, m))
					],
					popoverClasses: 'left-aligned'
				})}

				${this.renderSection({
					name: 'Log',
					icon: 'edit2',
					values: [ { name: 'Messages', value: request.log } ]
				})}

				${this.renderSection({
					name: 'Events',
					icon: 'zap',
					values: [ { name: 'Events', value: request.events } ]
				})}

				${this.renderSection({
					name: 'Database',
					icon: 'database',
					values: [
						{ name: 'Queries', value: request.database.queries.total },
						{ name: 'Database time', value: request.database.time, unit: 'ms' },
					],
					popover: [
						{ name: 'Queries', value: request.database.queries.total },
						{ name: 'Slow', value: request.database.queries.slow },
						{ name: 'Selects', value: request.database.queries.selects },
						{ name: 'Inserts', value: request.database.queries.inserts },
						{ name: 'Updates', value: request.database.queries.updates },
						{ name: 'Deletes', value: request.database.queries.deletes },
						{ name: 'Others', value: request.database.queries.others },
						{ name: 'Time', value: request.database.time, unit: 'ms' }
					]
				})}

				${this.renderSection({
					name: 'Models',
					icon: 'disc',
					values: [ { name: 'Models', value: request.models.total } ],
					popover: [
						{ name: 'Retrieved', value: request.models.retrieved },
						{ name: 'Created', value: request.models.created },
						{ name: 'Updated', value: request.models.updated },
						{ name: 'Deleted', value: request.models.deleted }
					]
				})}

				${this.renderSection({
					name: 'Cache',
					icon: 'paperclip',
					values: [
						{ name: 'Queries', value: request.cache.queries.total },
						{ name: 'Cache time', value: request.cache.time, unit: 'ms' }
					],
					popover: [
						{ name: 'Queries', value: request.cache.queries.total },
						{ name: 'Reads', value: request.cache.queries.reads },
						{ name: 'Hits', value: request.cache.queries.hits },
						{ name: 'Writes', value: request.cache.queries.writes },
						{ name: 'Deletes', value: request.cache.queries.deletes },
						{ name: 'Time', value: request.cache.time, unit: 'ms' }
					]
				})}

				${this.renderSection({
					name: 'Redis',
					icon: 'layers',
					values: [ { name: 'Commands', value: request.redis } ]
				})}

				${this.renderSection({
					name: 'Queue',
					icon: 'clock',
					values: [ { name: 'Jobs', value: request.queue } ]
				})}

				${this.renderSection({
					name: 'Views',
					icon: 'image',
					values: [ { name: 'Views', value: request.views } ]
				})}

				${this.renderSection({
					name: 'Notifications',
					icon: 'mail',
					values: [ { name: 'Notifications', value: request.notifications } ]
				})}

				${this.renderSection({
					name: 'Routes',
					icon: 'map',
					values: [ { name: 'Routes', value: request.routes } ]
				})}

				<div class="clockwork-toolbar-details">
					<span class="clockwork-toolbar-details-label">
						Show details
					</span>
					<a href="/clockwork/app#${request.id}" target="_blank" class="clockwork-toolbar-details-button">
						${icons.arrowRight}
					</a>
				</div>

				${this.renderChart(request.performanceMetrics)}
				${this.renderChart(request.clientMetrics.filter(m => m.onChart), 'chart-client')}
			</div>
		`

		this.appendStyles()

		let toolbar = document.createElement('div')
		toolbar.innerHTML = html

		document.querySelector('body').append(toolbar)
	}

	renderStatusSection(request) {
		let statusClass = r => {
			if (r.errorsCount || r.isServerError()) return 'error'
			if (r.warningsCount || r.isClientError()) return 'warning'
			return 'success'
		}

		let statusIcon = r => {
			if (r.errorsCount || r.isServerError()) return icons.alertCircle
			if (r.warningsCount || r.isClientError()) return icons.alertTriangle
			return icons.check
		}

		return `
			<div class="clockwork-toolbar-status ${statusClass(request)}">
				${statusIcon(request)}
			</div>
		`
	}

	renderSection(section) {
		let values = section.values.filter(v => v.value)
		let popover = section.popover ? section.popover.filter(v => v.value) : []

		values.forEach(v => v.value = v.unit ? `${v.value}&nbsp;${v.unit}` : v.value)
		popover.forEach(v => v.value = v.unit ? `${v.value}&nbsp;${v.unit}` : v.value)

		if (! values.length) return ''

		return `
			<div class="clockwork-toolbar-section">
				<div class="clockwork-toolbar-section-icon" title="${section.name}">
					${icons[section.icon]}
				</div>
				${values.map(({ name, value }) => {
					return `<div class="clockwork-toolbar-section-value" title="${name}">${value}</div>`
				}).join('')}
				<div class="clockwork-toolbar-section-popover ${section.popoverClasses || ''}">
					<div class="clockwork-toolbar-section-popover-content">
						<div class="clockwork-toolbar-section-popover-title">${icons[section.icon]} ${section.name}</div>
						<div class="clockwork-toolbar-section-popover-values">
							${popover.map(({ name, value, color }) => {
								return `<div class="clockwork-toolbar-section-popover-value">
									<div class="value">${value}</div>
									<div class="title ${color ? `has-mark mark-${color}` : ''}">${name}</div>
								</div>`
							}).join('')}
						</div>
					</div>
				</div>
			</div>
		`
	}

	renderChart(metrics, classes = '') {
		let totalTime = metrics.reduce((sum, m) => sum + m.value, 0)

		return `
			<div class="clockwork-toolbar-performance-chart ${classes}">
				${metrics.map(m => {
					return `<div class="bar ${m.color}" title="${m.name}" style="width:${m.value / totalTime * 100}%"></div>`
				}).join('')}
			</div>
		`
	}

	appendStyles() {
		let style = document.createElement('style')
		style.innerHTML = styles

		document.querySelector('body').append(style)
	}

	readCookie(name, defaultValue) {
		let _, value

		[ _, value ] = document.cookie.match(new RegExp(`(?:^| )${name}=([^;]*)`));

		return decodeURIComponent(value) || defaultValue
	}
}
