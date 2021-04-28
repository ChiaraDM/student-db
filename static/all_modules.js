"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

mainApp.controller("moduleController", function($scope, $http) {
    $http.get('/modules').then(function(response) {
      $scope.modules = response.data;
    });
   // Sends a delete message to the server
   $scope.deleteModule = function(code) {
    // Send delete message to /module/code
        $http.delete("/module/" + code).then(function(response) {
      // When request completes, refresh list of modules
            $http.get("/modules").then(function(response) {
                $scope.modules = response.data;
            });
        });
    };
});