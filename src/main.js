const fs = require("fs");

class Partner {
  constructor(name) {
    this.name = name;
  }
}

class Company {
  constructor(name) {
    this.name = name;
    this.employees = new Set();
    this.relationships = new Map();
  }
}

class Employee {
  constructor(name, company) {
    this.name = name;
    this.company = company;
  }
}

let partners = new Map();
let companies = new Map();
let employees = new Map();
