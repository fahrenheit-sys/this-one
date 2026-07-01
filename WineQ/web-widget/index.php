<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>WineQ.ai Web Widget</title>
	<style>
		body {
			height: 100%;
		}
	</style>
</head>
<body>
	<div id="wineqai-widget-container"></div>
	<script type="text/javascript">
		(function (w) {
			var WineQAIWidgetScript = document.createElement('script');
			WineQAIWidgetScript.setAttribute('async', 'async');
			WineQAIWidgetScript.setAttribute('src', '//dev.wineq.ai/web-widget/wineqai_widget.js?t=' + (new Date().getTime()));
			WineQAIWidgetScript.setAttribute('type', 'text/javascript');
			WineQAIWidgetScript.onload = function () {
				if (typeof w.WineQAIWidgetInstance === 'undefined') {
			  		w.WineQAIWidgetInstance = new WineQAI_Widget({key:'n7kGKzdV0ZeyqmIg'});
			  	}
			};
			document.head.appendChild(WineQAIWidgetScript);
		})(window);
	</script>
</body>
</html>