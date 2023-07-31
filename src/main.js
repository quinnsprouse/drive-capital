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

class NetworkAnalyzer {
  constructor(fileSystem = fs, logger = console.log) {
    this.partners = new Map();
    this.companies = new Map();
    this.employees = new Map();
    this.fileSystem = fileSystem;
    this.logger = logger;
  }

  processPartnerCommand(name) {
    this.partners.set(name, new Partner(name));
  }

  processCompanyCommand(name) {
    this.companies.set(name, new Company(name));
  }

  processEmployeeCommand(name, companyName) {
    if (this.companies.has(companyName)) {
      const employee = new Employee(name, companyName);
      this.companies.get(companyName).employees.add(employee);
      this.employees.set(name, employee);
    }
  }

  processContactCommand(employeeName, partnerName) {
    if (this.employees.has(employeeName) && this.partners.has(partnerName)) {
      const employeeCompany = this.companies.get(
        this.employees.get(employeeName).company
      );
      const count = employeeCompany.relationships.get(partnerName) || 0;
      employeeCompany.relationships.set(partnerName, count + 1);
    }
  }

  analyze(filename) {
    const fileStream = this.fileSystem.createReadStream(filename, "utf-8");
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (!line.trim()) return;

      const [command, ...args] = line.split(" ");

      switch (command) {
        case "Partner":
          this.processPartnerCommand(...args);
          break;
        case "Company":
          this.processCompanyCommand(...args);
          break;
        case "Employee":
          this.processEmployeeCommand(...args);
          break;
        case "Contact":
          this.processContactCommand(...args);
          break;
      }
    });

    rl.on("close", () => {
      [...this.companies.keys()].sort().forEach((companyName) => {
        const company = this.companies.get(companyName);
        const strongestRelationship = [...company.relationships.entries()].sort(
          (a, b) => b[1] - a[1]
        )[0];

        if (!strongestRelationship) {
          this.logger(`${companyName}: No current relationship`);
        } else {
          this.logger(
            `${companyName}: ${strongestRelationship[0]} (${strongestRelationship[1]})`
          );
        }
      });
    });
  }
}

if (process.argv.length != 3) {
  console.log("Usage: node analyze_network.js <filename>");
  process.exit(1);
}

const analyzer = new NetworkAnalyzer();
analyzer.analyze(process.argv[2]);

module.exports = {
  Partner,
  Company,
  Employee,
  NetworkAnalyzer,
};
