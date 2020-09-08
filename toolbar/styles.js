export default `
.clockwork-toolbar {
	align-items: center;
	background: #fcfcfd;
	bottom: 0;
	box-sizing: border-box;
	color: #000;
	cursor: default;
	display: flex;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	font-size: 13px;
	font-weight: normal;
	height: 32px;
	left: 0;
	position: fixed;
	width: 100%;
	z-index: 9999;
}

.clockwork-toolbar * {
	box-sizing: border-box;
}

.clockwork-toolbar-status {
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	width: 32px;
}

.clockwork-toolbar-status.success {
    background: hsl(109, 52%, 45%);
    color: #fff;
}

.clockwork-toolbar-status.warning {
    background: hsl(33, 87%, 47%);
    color: #fff;
}

.clockwork-toolbar-status.error {
    background: hsl(359, 57%, 55%);
    color: #fff;
}

.clockwork-toolbar-section {
	align-items: center;
	border-right: 1px solid #d1d1e0;
	border-right: 1px solid #f3f3f3;
	display: flex;
	height: 100%;
	padding: 0 14px;
	position: relative;
}

.clockwork-toolbar-section-value {
	color: #258cdb;
	font-size: 95%;
	font-weight: 600;
	padding-left: 10px;
}

.clockwork-toolbar-section-popover {
	bottom: 100%;
	display: none;
	left: 50%;
	padding-bottom: 17px;
	position: absolute;
    transform: translateX(-50%);
	z-index: 666;
}

.clockwork-toolbar-section:hover .clockwork-toolbar-section-popover {
	display: block;
}

.clockwork-toolbar-section-popover-content {
	background: hsl(240, 20%, 99%);
	border-radius: 8px;
	box-shadow: 0 1px 5px rgba(33, 33, 33, 0.4);
	font-size: 90%;
	max-height: 400px;
	overflow: auto;
	width: 100%;
}

.clockwork-toolbar-section-popover-content:before, .clockwork-toolbar-section-popover-content:after {
	border-style: solid;
	content: '';
	height: 0;
	position: absolute;
	width: 0;
}

.clockwork-toolbar-section-popover-content:before {
	border-color: hsl(240, 20%, 99%) transparent transparent transparent;
	border-width: 11px 11px 0 11px;
	bottom: 7px;
	left: calc(50% - 10px);
	z-index: 500;
}

.clockwork-toolbar-section-popover-content:after {
	border-color: rgba(33, 33, 33, 0.06) transparent transparent transparent;
	border-width: 12px 12px 0 12px;
	bottom: 5px;
	left: calc(50% - 11px);
}

.clockwork-toolbar-section-popover.left-aligned {
    transform: translateX(-35px);
}

.clockwork-toolbar-section-popover.left-aligned .clockwork-toolbar-section-popover-content:before {
	left: 35px;
	right: auto;
}

.clockwork-toolbar-section-popover.left-aligned .clockwork-toolbar-section-popover-content:after {
	left: 34px;
	right: auto;
}

.clockwork-toolbar-section-popover-title {
	align-items: center;
	color: #404040;
	display: flex;
    padding: 8px 12px;
}

.clockwork-toolbar-section-popover-title .feather {
	margin-right: 5px;
}

.clockwork-toolbar-section-popover-values {
    align-items: center;
	border-top: 1px solid #e7e7ef;
    display: flex;
}

.clockwork-toolbar-section-popover-value {
	border-right: 1px solid #e7e7ef;
    cursor: default;
    padding: 8px 12px 8px;
}

.clockwork-toolbar-section-popover-value .value {
    color: #258cdb;
    font-size: 135%;
    margin-bottom: 3px;
    white-space: nowrap;
}

.clockwork-toolbar-section-popover-value .title {
    color: #777;
    font-size: 85%;
    text-transform: uppercase;
    white-space: nowrap;
}

.clockwork-toolbar-section-popover-value .title.has-mark:before {
	border-radius: 50%;
	content: '';
	display: inline-block;
	height: 7px;
	margin-right: 3px;
	width: 7px;
}

.clockwork-toolbar-section-popover-value .title.mark-blue:before {
	background: hsl(212, 89%, 55%);
}

.clockwork-toolbar-section-popover-value .title.mark-red:before {
	background: hsl(359, 57%, 55%);
}

.clockwork-toolbar-section-popover-value .title.mark-green:before {
	background: hsl(109, 52%, 45%);
}

.clockwork-toolbar-section-popover-value .title.mark-purple:before {
	background: hsl(273, 57%, 55%);
}

.clockwork-toolbar-section-popover-value .title.mark-grey:before {
	background: hsl(240, 5, 27);
}

.clockwork-toolbar-details {
	align-items: center;
	display: flex;
	height: 100%;
	margin-left: auto;
}

.clockwork-toolbar-details-label {
	font-size: 85%;
}

.clockwork-toolbar-details-button {
	align-items: center;
	background: hsl(30, 1%, 96%);
	background: #2786f3;
	color: dimgrey;
	color: #fff;
	display: flex;
	height: 100%;
	justify-content: center;
	margin-left: 8px;
	text-decoration: none;
	width: 32px;
}

.clockwork-toolbar-performance-chart {
	position: absolute;
	left: 0;
	top: 0;
	height: 1px;
	display: flex;
	width: calc(100% - 64px);
	left: 32px;
}

.clockwork-toolbar-performance-chart .bar {
	height: 100%;
}

.clockwork-toolbar-performance-chart .bar.blue {
	background: hsl(212, 89%, 55%);
}

.clockwork-toolbar-performance-chart .bar.red {
	background: hsl(359, 57%, 55%);
}

.clockwork-toolbar-performance-chart .bar.green {
	background: hsl(109, 52%, 45%);
}

.clockwork-toolbar-performance-chart .bar.purple {
	background: hsl(273, 57%, 55%);
}

.clockwork-toolbar-performance-chart .bar.grey {
	background: hsl(240, 5, 27);
}

.clockwork-toolbar-performance-chart.chart-client {
	bottom: 0;
	top: inherit;
}

.clockwork-toolbar .feather {
	display: inline-block;
	height: 1em;
	width: 1em;
	vertical-align: -0.125em;
}

.clockwork-toolbar .feather svg {
	display: block;
	height: 100%;
	width: 100%;
}
`