'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

app.controller('GeofenceCtrl', ['$scope', '$q', '$http',  function ($scope, $q, $http) {
    $scope.upload = function(message){
        console.log("upload invoked");
        console.log(message);
        
        var deferred = $q.defer();

        var fd = new FormData();
        angular.forEach(message, function(value, key) {
            fd.append(key, value);
        });

        $http({
           method: 'POST',
           url: 'https://whatsnear.azure-mobile.net/api/uploadgeofences',
           data: fd, // your original form data,
           //transformRequest: formDataObject,  // this sends your data to the formDataObject provider that we are defining below.
           headers: {'Content-Type': 'multipart/form-data'}
        }).
         success(function(data, status, headers, config){
           deferred.resolve(data);
         }).
         error(function(data, status, headers, config){
           deferred.reject(status);
         });
        
        return deferred.promise;
    };
/*
    GeofenceFactory.get({}, function (geofenceFactory) {
        
    })
*/
}]);

app.factory('formDataObject', function() {
    return function(data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        return fd;
    };
});

app.controller('CampaignListCtrl', ['$scope', '$location',
    function ($scope, $location) {
        // callback for ng-click 'editCampaign':
        $scope.editCampaign = function (campaignId) {
            $location.path('/campaign-detail/' + campaignId);
        };

        // callback for ng-click 'deleteCampaign':
        $scope.deleteCampaign = function (campaignId) {
            var MobileServiceClient = WindowsAzure.MobileServiceClient;
            var client = new MobileServiceClient('https://whatsnear.azure-mobile.net', 'EjdhbaDTswHOgtoicPVnxRRqiVbaPL81');
            var campaignTable = client.getTable('campaign');
            campaignTable.del({id: campaignId}).done(function () {
               campaignTable.take(100).read().done(function (results) {
                    $scope.campaign = results;
                    $scope.$apply();
                }, function (err) {
                   alert("Error: " + err);
                });
            }, function (err) {
               alert("Error: " + err);
            });;
        };

        // callback for ng-click 'createUser':
        $scope.createNewCampaign = function () {
            $location.path('/campaign-create');
        };

        //load data
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new MobileServiceClient('https://whatsnear.azure-mobile.net', 'EjdhbaDTswHOgtoicPVnxRRqiVbaPL81');
        var campaignTable = client.getTable('campaign');

        campaignTable.take(100).read().done(function (results) {
            $scope.campaign = results;
            $scope.$apply();
        }, function (err) {
           alert("Error: " + err);
        });
    }]);

app.controller('CampaignCreateCtrl', ['$scope', '$location',
    function ($scope, $location) {

        // callback for ng-click 'createNewUser':
        $scope.createNewCampaign = function () {
            var MobileServiceClient = WindowsAzure.MobileServiceClient;
            var client = new MobileServiceClient('https://whatsnear.azure-mobile.net', 'EjdhbaDTswHOgtoicPVnxRRqiVbaPL81');
            var campaignTable = client.getTable('campaign');

            campaignTable.insert({
               fenceName: $scope.campaign.fenceName,
               url: $scope.campaign.url
            }).done(function (result) {
               //alert(JSON.stringify(result));
               $location.path('/campaign-list');
               $scope.$apply();
            }, function (err) {
               alert("Error: " + err);
            });
        }
    }]);

app.controller('CampaignTrafficListCtrl', ['$scope', '$location',
    function ($scope, $location) {
        // load data
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new MobileServiceClient('https://whatsnear.azure-mobile.net', 'EjdhbaDTswHOgtoicPVnxRRqiVbaPL81');

        var campaignTrafficTable = client.getTable('campaignTraffic');

        campaignTrafficTable.take(100).read().done(function (results) {
            $scope.campaignTraffic = results;
            $scope.$apply();
        }, function (err) {
           alert("Error: " + err);
        });
    }]);