"use strict";

class Student {
    // Student ID
    id;
    // Student first name
    first_name;
    // Student last name
    last_name;
    // Student programme
    programme;
    // Student modules and grades
    modules = [];

    constructor(id, first_name, last_name, programme) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.programme = programme;
    }
}

class Programme {
    // Programme code
    code;
    // Programme name
    name;
    // Programme modules
    modules = [];

    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class Module {
    // Module code
    code;
    // Module name
    name;

    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}