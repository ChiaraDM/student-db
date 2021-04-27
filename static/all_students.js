"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("studentController", function($scope, $http) {
  $scope.students = [
    new Student("001", "Test", "Test", new Programme("001", "Test")),
    new Student("002", "Tester", "Tester", new Programme("002", "Test 2"))
  ];
});