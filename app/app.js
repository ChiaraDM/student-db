"use strict";

// The application layer uses student classes
const student = require("../student.js");

// The application layer talks to the data layer
const data = require("../data/data.js");

// Import express library.
const express = require("express");

// Create express application
var app = express();

// Add static files location
app.use(express.static("static"));

// Add /module endpoint
app.get("/module/:code", function(req, res) {
  // Return "Module <code>"
  res.send("Module " + req.params.code);
});

// Add /modules endpoint
app.get("/modules", function(req, res) {
    // Call getModules on data
    data.getModules(function(modules) {
        res.json(modules);
    });
});

// Add /programme endpoint
app.get("/programme/:code", function(req, res) {
  // Return "Programme <code>"
  res.send("Programme " + req.params.code);
});

// Add /programmes endpoint
app.get("/programmes", function(req, res) {
    // Call getProgrammes on data
    data.getProgrammes(function(programmes) {
        res.json(programmes);
    });
});

// Add /student endpoint
app.get("/student/:id", function(req, res) {
  // Return "Student <id>"
  res.send("Student " + req.params.id);
});

// Add /students endpoint
app.get("/students", function(req, res) {
    // Call getStudents on data
    data.getStudents(function(students) {
      res.json(students);
    });
  });

// Start listening on port 3000
app.listen(3000, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log("Server started.");
});