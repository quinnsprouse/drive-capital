const fs = require("fs");
const readline = require("readline");

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

const analyzeNetwork = (filename) => {
  const fileStream = fs.createReadStream(filename, "utf-8");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    if (!line.trim()) return; // Ignore empty lines

    const [command, ...args] = line.split(" ");

    switch (command) {
      case "Partner":
        processPartnerCommand(...args);
        break;
      case "Company":
        processCompanyCommand(...args);
        break;
      case "Employee":
        processEmployeeCommand(...args);
        break;
      case "Contact":
        processContactCommand(...args);
        break;
    }
  });

  rl.on("close", () => {
    // Sort and print companies with their strongest relationship
    [...companies.keys()].sort().forEach((companyName) => {
      const company = companies.get(companyName);
      const strongestRelationship = [...company.relationships.entries()].sort(
        (a, b) => b[1] - a[1]
      )[0];

      if (!strongestRelationship) {
        console.log(`${companyName}: No current relationship`);
      } else {
        console.log(
          `${companyName}: ${strongestRelationship[0]} (${strongestRelationship[1]})`
        );
      }
    });
  });
};

if (process.argv.length != 3) {
  console.log("Usage: node analyze_network.js <filename>");
  process.exit(1);
}

analyzeNetwork(process.argv[2]);

module.exports = {
  Partner,
  Company,
  Employee,
  processPartnerCommand,
  processCompanyCommand,
  processEmployeeCommand,
  processContactCommand,
  analyzeNetwork,
};
