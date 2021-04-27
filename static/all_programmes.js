"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("programmeController", function($scope, $http) {
    // Initially hides the "selected" element
    document.getElementById("selected").style.display="none";
  
    $http.get("/programmes").then(function(response) {
      $scope.programmes = response.data;
    });
  
    $scope.selectProgramme = function(code) {
      // Get specific programme by code
      $http.get("/programme/" + code).then(function(response) {
        $scope.selectedProgramme = response.data;
        // Show the "selected" element
        document.getElementById("selected").style.display="block";
      });
    }
  });