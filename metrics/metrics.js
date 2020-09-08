import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

export default class Metrics
{
	constructor() {
		this.requestId = this.readCookie('clockwork_id')
		this.path = this.readCookie('clockwork_path', '/__clockwork/')
		this.updateToken = this.readCookie('clockwork_token')

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
		getCLS(v => this.updateVitals('cls', v.value))
		getFID(v => this.updateVitals('fid', v.value))
		getLCP(v => this.updateVitals('lcp', v.value))
		getFCP(v => this.updateVitals('fcp', v.value))
		getTTFB(v => this.updateVitals('ttfb', v.value))
	}

	readCookie(name, defaultValue) {
		let _, value

		[ _, value ] = document.cookie.match(new RegExp(`(?:^| )${name}=([^;]*)`));

		return decodeURIComponent(value) || defaultValue
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
