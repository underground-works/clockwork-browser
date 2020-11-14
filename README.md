<p align="center">
	<img width="300px" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/title.png">
	<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/screenshot.png">
</p>

> Clockwork is a development tool for PHP available right in your browser. Clockwork gives you an insight into your application runtime - including request data, performance metrics, log entries, database queries, cache queries, redis commands, dispatched events, queued jobs, rendered views and more - for HTTP requests, commands, queue jobs and tests.

> *This repository contains the client-side metrics and toolbar components of Clockwork.*

> Check out on the [Clockwork website](https://underground.works/clockwork) for details.

<p align="center">
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-1.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-2.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-3.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-4.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-5.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-6.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-7.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/features-8.png">
	</a>
</p>

### Installation

This is an optional client-side component for Clockwork, adding support for client-side metrics and Clockwork toolbar.

#### Via NPM

Clockwork client-side component can be installed via npm:

```
$ npm install clockwork-browser
```

Next simply import the metrics, toolbar or both in your app.js:

```js
import 'clockwork-browser/metrics'
import 'clockwork-browser/toolbar'
```

### From CDN

You can also load the client-side scripts form a cdn:

```html
<script src="https://cdn.jsdelivr.net/gh/underground-works/clockwork-browser@1/dist/metrics.js"></script>
<script src="https://cdn.jsdelivr.net/gh/underground-works/clockwork-browser@1/dist/toolbar.js"></script>
```

The cdn builds are transpiled to support all browsers with more than 1% market share. The cdn bundle sizes are *6.14K for metrics.js* and *23.8K for toolbar.js*.

Read the full installation guide on the [Clockwork website](https://underground.works/clockwork).

### Development

Use `npm run build` to build the cdn bundles.

<p align="center">
	<a href="https://underground.works">
		<img width="150px" src="https://github.com/underground-works/clockwork-browser/raw/master/.github/assets/footer.png">
	</a>
</p>
