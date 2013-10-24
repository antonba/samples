'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngdemo.filters', 'ngdemo.services', 'ngdemo.directives', 'ngdemo.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/upload-geofences', {templateUrl: 'partials/upload-geofences.html', controller: 'GeofenceCtrl'});
        $routeProvider.when('/campaign-list', {templateUrl: 'partials/campaign-list.html', controller: 'CampaignListCtrl'});
        //$routeProvider.when('/capmaign-detail/:id', {templateUrl: 'partials/campaign-detail.html', controller: 'CampaignDetailCtrl'});
        $routeProvider.when('/campaign-create', {templateUrl: 'partials/campaign-create.html', controller: 'CampaignCreateCtrl'});
        $routeProvider.when('/campaign-traffic-list', {templateUrl: 'partials/campaign-traffic-list.html', controller: 'CampaignTrafficListCtrl'});
		$routeProvider.otherwise({redirectTo: '/campaign-list'});
    }]);
