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
    // Call getModule on data
    data.getModule(req.params.code, function(module) {
        res.json(module);
    });
});

// Add /module delete endpoint
app.delete("/module/:code", function(req, res) {
    // Call deleteModule on data
    data.deleteModule(req.params.code, function() {
      // After delete completed respond to browser OK
      res.send("OK");
    });
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
    // Call getProgramme on data
    data.getProgramme(req.params.code, function(programme) {
        res.json(programme);
    });
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
    // Call getStudent on data
    data.getStudent(req.params.id, function(student) {
        res.json(student);
    });
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