"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("studentController", function($scope, $http) {
    $http.get("/students").then(function(response) {
      $scope.students = response.data;
    });
  });