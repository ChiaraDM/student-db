"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("programmeController", function($scope, $http) {
    $http.get("/programmes").then(function(response) {
      $scope.programmes = response.data;
    });
  });