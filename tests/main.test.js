const fs = require("fs");
const { Partner, Company, Employee, NetworkAnalyzer } = require("../src/main"); // Adjust the path accordingly

describe("Partner class", () => {
  test("should create a new Partner", () => {
    const partner = new Partner("John Doe");
    expect(partner.name).toBe("John Doe");
  });
});

describe("Company class", () => {
  test("should create a new Company", () => {
    const company = new Company("TechCorp");
    expect(company.name).toBe("TechCorp");
    expect(company.employees).toEqual(new Set());
    expect(company.relationships).toEqual(new Map());
  });
});

describe("Employee class", () => {
  test("should create a new Employee", () => {
    const employee = new Employee("Jane Doe", "TechCorp");
    expect(employee.name).toBe("Jane Doe");
    expect(employee.company).toBe("TechCorp");
  });
});

describe("NetworkAnalyzer class", () => {
  let networkAnalyzer;
  let mockLog;

  beforeEach(() => {
    mockLog = jest.fn();
    networkAnalyzer = new NetworkAnalyzer(fs, mockLog);
  });

  test("should process Partner command", () => {
    networkAnalyzer.processPartnerCommand("John Doe");
    expect(networkAnalyzer.partners.get("John Doe")).toBeInstanceOf(Partner);
  });

  test("should process Company command", () => {
    networkAnalyzer.processCompanyCommand("TechCorp");
    expect(networkAnalyzer.companies.get("TechCorp")).toBeInstanceOf(Company);
  });

  test("should process Employee command", () => {
    networkAnalyzer.processCompanyCommand("TechCorp");
    networkAnalyzer.processEmployeeCommand("Jane Doe", "TechCorp");
    expect(networkAnalyzer.employees.get("Jane Doe")).toBeInstanceOf(Employee);
    expect(networkAnalyzer.companies.get("TechCorp").employees.size).toBe(1);
  });

  test("should not process Employee command if company does not exist", () => {
    networkAnalyzer.processEmployeeCommand("Jane Doe", "NonExistentCorp");
    expect(networkAnalyzer.employees.has("Jane Doe")).toBeFalsy();
  });

  test("should process Contact command", () => {
    networkAnalyzer.processCompanyCommand("TechCorp");
    networkAnalyzer.processPartnerCommand("John Doe");
    networkAnalyzer.processEmployeeCommand("Jane Doe", "TechCorp");
    networkAnalyzer.processContactCommand("Jane Doe", "John Doe");
    expect(
      networkAnalyzer.companies.get("TechCorp").relationships.get("John Doe")
    ).toBe(1);
  });
});
