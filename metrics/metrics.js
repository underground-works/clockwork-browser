import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

export default class Metrics
{
	constructor() {
		let payload = this.payload()

		this.enabled = payload.metrics
		this.requestId = payload.requestId
		this.path = payload.path || '/__clockwork/'
		this.updateToken = payload.token

		this.metrics = {
			redirect: null,
			dns: null,
			connection: null,
			waiting: null,
			downloading: null,
			domLoading: null,
			domInteractive: null
		}

		this.vitals = {
			cls: null,
			fid: null,
			lcp: null,
			fcp: null,
			ttfb: null
		}
	}

	collectMetrics() {
		if (! this.enabled) return

		document.addEventListener('readystatechange', ev => {
			if (document.readyState != 'complete') return

			let timing = window.performance.timing

			this.updateMetrics({
				redirect: timing.redirectEnd - timing.redirectStart,
				dns: timing.domainLookupEnd - timing.domainLookupStart,
				connection: timing.connectEnd- timing.connectStart,
				waiting: timing.responseStart - timing.requestStart,
				receiving: timing.responseEnd - timing.responseStart,
				domInteractive: timing.domInteractive - timing.domLoading,
				domComplete: timing.domComplete - timing.domInteractive
			})
		})
	}

	collectVitals() {
		if (! this.enabled) return

		getCLS(v => this.updateVitals('cls', v.value))
		getFID(v => this.updateVitals('fid', v.value))
		getLCP(v => this.updateVitals('lcp', v.value))
		getFCP(v => this.updateVitals('fcp', v.value))
		getTTFB(v => this.updateVitals('ttfb', v.value))
	}

	payload() {
		let matches = document.cookie.match(/(?:^| )x-clockwork=([^;]*)/)

		return matches ? JSON.parse(decodeURIComponent(matches[1])) : {}
	}

	updateMetrics(metrics) {
		Object.assign(this.metrics, metrics)

		this.send()
	}

	updateVitals(name, value) {
		this.vitals[name] = value

		this.send()
	}

	send() {
		clearTimeout(this.timeout)

		this.timeout = setTimeout(() => {
			fetch(`${this.path}${this.requestId}`, {
				method: 'post',
				headers: new Headers({ 'X-HTTP-Method-Override': 'PUT' }),
				body: JSON.stringify({
					_token: this.updateToken,
					clientMetrics: this.metrics,
					webVitals: this.vitals
				})
			})
		}, 500)
	}
}
