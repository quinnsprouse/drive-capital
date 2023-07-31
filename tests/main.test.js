const fs = require("fs");
const readline = require("readline");
const {
  Partner,
  Company,
  Employee,
  NetworkAnalyzer,
} = require("../src/main.js");

describe("Network Analyzer", () => {
  describe("Process Partner Command", () => {
    it("create a new partner", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processPartnerCommand("John");

      expect(analyzer.partners.get("John")).toEqual(new Partner("John"));
    });
  });

  describe("Process Company Command", () => {
    it("should create and store a new company", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processCompanyCommand("Apple");

      expect(analyzer.companies.get("Apple")).toEqual(new Company("Apple"));
    });
  });

  describe("Process Employee Command", () => {
    it("should create a new employee for an existing company", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processCompanyCommand("Apple");
      analyzer.processEmployeeCommand("Steve", "Apple");

      expect(analyzer.employees.get("Steve")).toEqual(
        new Employee("Steve", "Apple")
      );
      expect(
        analyzer.companies
          .get("Apple")
          .employees.has(analyzer.employees.get("Steve"))
      ).toBe(true);
    });

    it("should not create an employee for a non-existing company", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processEmployeeCommand("Steve", "Apple");

      expect(analyzer.employees.has("Steve")).toBe(false);
    });
  });

  describe("Process Contact Command", () => {
    it("should increase the contact count for a valid employee and partner", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processCompanyCommand("Apple");
      analyzer.processEmployeeCommand("Steve", "Apple");
      analyzer.processPartnerCommand("John");
      analyzer.processContactCommand("Steve", "John");

      expect(analyzer.companies.get("Apple").relationships.get("John")).toBe(1);
    });

    it("should not increase the contact count for an invalid employee or partner", () => {
      const analyzer = new NetworkAnalyzer();
      analyzer.processContactCommand("Steve", "John");

      expect(analyzer.companies.size).toBe(0);
    });
  });
});
