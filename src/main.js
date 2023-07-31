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

function processPartnerCommand(name) {
  partners.set(name, new Partner(name));
}

function processCompanyCommand(name) {
  companies.set(name, new Company(name));
}

function processEmployeeCommand(name, companyName) {
  if (companies.has(companyName)) {
    const employee = new Employee(name, companyName);
    companies.get(companyName).employees.add(employee);
    employees.set(name, employee);
  }
}

function processContactCommand(employeeName, partnerName) {
  if (employees.has(employeeName) && partners.has(partnerName)) {
    const employeeCompany = companies.get(employees.get(employeeName).company);
    const count = employeeCompany.relationships.get(partnerName) || 0;
    employeeCompany.relationships.set(partnerName, count + 1);
  }
}
