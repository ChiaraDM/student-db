"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("programmeController", function($scope, $http) {
  $scope.programmes = [
    new Programme("001", "Test Program 1"),
    new Programme("002", "Test Program 2")
  ];
});