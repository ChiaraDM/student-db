"use strict";

// Import SQLite library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses student classes
const student = require("../student.js");

// Connect to the database.
var db = new sqlite3.Database("data/students-case-study.db", function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to students database.");
});
// Export getStudents function
exports.getStudents = function(callback) {
    // Create SQL statement
    var sql = `
        SELECT 
            Students.id, 
            Students.first_name, 
            Students.last_name, 
            Students.programme,
            Programmes.name
        FROM
            Students,
            Programmes
        WHERE
            Students.programme = Programmes.code
        `;
    // Execute query. Return all
    db.all(sql, function(err, rows) {
        // Check if error
        if (err) {
            return console.error(err.message);
        }
        // Create an array of Students
        var students = [];
        // Loop through rows creating Student objects
        for (var row of rows) {
            // Create programme object
            var prog = new student.Programme(row.programme, row.name);
            // Create student object
            var stud = new student.Student(row.id, row.first_name, row.last_name, prog);
            // Add student to array
            students.push(stud);
        }
        // Execute callback function
        callback(students);
    });
};

// Export getProgrammes function
exports.getProgrammes = function(callback) {
    // Create SQL statement
    var sql = `SELECT * FROM Programmes`;
    // Execute query. Return all
    db.all(sql, function(err, rows) {
        // Check if error
        if (err) {
            return console.error(err.message);
        }
        // Create programme array
        var programmes = [];
        // Loop through rows creating programme objects
        for (var row of rows) {
            // Create programme object
            var prog = new student.Programme(row.code, row.name);
            // Add object to array
            programmes.push(prog);
        }
        // Execute callback function
        callback(programmes);
    });
};

// Export getModules function
exports.getModules = function(callback) {
    // Create SQL statement
    var sql = `SELECT * FROM Modules`;
    // Execute query. Return all
    db.all(sql, function(err, rows) {
        // Check if error
        if (err) {
            return console.error(err.message);
        }
        // Create modules array
        var modules = [];
        // Loop through each row and create a module object
        for (var row of rows) {
            // Create module object
            var mod = new student.Module(row.code, row.name);
            // Add module to array
            modules.push(mod);
        }
        // Execute callback function
        callback(modules);
    });
};

// Export getModule function
exports.getModule = function(code, callback) {
    // Create SQL statement
    var sql = `
        SELECT * FROM Modules
        WHERE code = '${code}'`;
    // Execute query. Only one row returned.
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        // Create a module object
        var module = new student.Module(row.code, row.name);
        // Return module
        callback(module);
    });
};

// Export getProgramme function
exports.getProgramme = function(code, callback) {
    // Create SQL statement
    // First get the programme
    var sql = `
        SELECT * FROM Programmes
        WHERE code = '${code}'`;
    // Execute query. Only one row returned
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        // Create the programme object
        var prog = new student.Programme(row.code, row.name);
        // Now get the modules for the programme.
        sql = `
            SELECT Modules.code, Modules.name
            FROM Modules, Programme_Modules
            WHERE 
                Programme_Modules.programme = '${code}'
                AND
                Programme_Modules.module = Modules.code`;
        // Execute query. Multiple rows returned.
        db.all(sql, function(err, rows) {
            if (err) {
                return console.error(err.message);
            }
            // Loop through each row and create a module object
            for (var row of rows) {
                // Create module object
                var mod = new student.Module(row.code, row.name);
                // Add module to programme
                prog.modules.push(mod);
            }
            // Return programme
            callback(prog);
        });
    });
};

// Export getStudent function
exports.getStudent = function(id, callback) {
    // Create SQL statement
    // First get the student and their programme details
    var sql = `
        SELECT 
            Students.id, 
            Students.first_name, 
            Students.last_name, 
            Students.programme,
            Programmes.name
        FROM
            Students,
            Programmes
        WHERE
            Students.id = '1'
            AND
            Students.programme = Programmes.code
        `;
    // Execut query. Only one row returned.
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        // Create programme object
        var prog = new student.Programme(row.programme, row.name);
        // Create student object
        var stud = new student.Student(row.id, row.first_name, row.last_name, prog);
        // Now get the grades for the student
        sql = `
            SELECT
                Modules.code,
                Modules.name,
                Grades.grade
            FROM
                Modules, Grades
            WHERE
                Grades.student = ${id}
                AND
                Grades.module = Modules.code
            `;
        // Execute query. Multiple rows returned.
        db.all(sql, function(err, rows) {
            if (err) {
                return console.error(err.message);
            }
            // Loop through each row and create a module object and attach a grade
            for (var row of rows) {
                // Create module object
                var module = new student.Module(row.code, row.name);
                // Create a module combined with grade
                var grade = {module, grade:row.grade}
                // Add module and grade to student
                stud.modules.push(grade);
            }
            // Return student
            callback(stud);
        });
    });
};

// Deletes a module from the database
exports.deleteModule = function(code, callback) {
    // Create SQL delete statement
    var sql = `DELETE FROM Modules WHERE code='${code}'`;
    // Execute SQL delete statement
    db.exec(sql, function(err) {
      // Once completed, execute callback function
      callback();
    });
  };