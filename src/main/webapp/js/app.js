'use strict';

/**
*  savApp Module
*
* Main module of application.
*/
var savApp = angular.module('savApp', [
	'ngRoute',
	'savControllers','ui.router',
	'savServices'
]);

// Create configuration constants for main Module

savApp.constant('ActionURL','http://localhost:4567/getData');