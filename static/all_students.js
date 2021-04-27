"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("studentController", function($scope, $http) {
    // Initially hides the "selected" element
    document.getElementById("selected").style.display="none";
  
    $http.get("/students").then(function(response) {
      $scope.students = response.data;
    });
  
    $scope.selectStudent = function(id) {
      // Get student by id
      $http.get("/student/" + id).then(function(response) {
        $scope.selectedStudent = response.data;
        // Show the selected element
        document.getElementById("selected").style.display="block";
      });
    }
  });