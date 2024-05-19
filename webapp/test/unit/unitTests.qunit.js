/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"dj/dj_chatbot/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
