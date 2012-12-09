
var scripts = ['scripts/libs/sugar-1.3.6-custom.min.js', 'scripts/script.js'];


for (i=0; i < scripts.length; i++) {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(scripts[i]);
	s.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
}


var styles = ['css/style.css'];

// <link rel="stylesheet" type="text/css" href="/static/default.css?t=1353551669" />
for (i=0; i < styles.length; i++) {
	var s = document.createElement('link');
	s.href = chrome.extension.getURL(styles[i]);
	s.rel = "stylesheet";
	s.type = "text/css";
	(document.head||document.documentElement).appendChild(s);
}

var addButton = function() {
	console.info('BTT: adding UP button');
	var $upButton = $('<div id="autobop"><img src="' + chrome.extension.getURL('images/vote-up.png') + '" data-url-off="' + chrome.extension.getURL('images/vote-up.png') + '" data-url-on="' + chrome.extension.getURL('images/vote-up-on.png') + '" /></div>');
	$upButton.appendTo('#chat .chatBar');

};



setTimeout(function() {
	addButton();
}, 1000);