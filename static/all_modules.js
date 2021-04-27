"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

mainApp.controller("moduleController", function($scope, $http) {
    $scope.modules = [
      new Module("000", "Test"),
      new Module("001", "Tester")
    ];
  });