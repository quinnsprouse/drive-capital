# 🌐 Network Analyzer

Network Analyzer is a program that processes network relationships between partners, companies, and employees. It reads commands from a file and prints out the companies' strongest relationships.

## Table of Contents

- [Building](#building)
- [Running](#running)
- [Testing](#testing)
- [Approach and Design Decisions](#approach-and-design-decisions)
- [Assumptions and Edge Cases](#assumptions-and-edge-cases)

## 🏗️ Building

To build this program, you'll need Node.js installed on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/username/network-analyzer.git
   ```

2. Navigate to the directory:

   ```bash
   cd network-analyzer
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## ▶️ Running

You can run the program by executing the following command:

```bash
node start input.txt
```

Replace `input.txt` with the path to the file containing the text you want to process.

## 🧪 Testing

To run the tests, use the following command:

```bash
npm test
```

## 🧠 Approach and Design Decisions

The problem was approached by defining classes to represent partners, companies, and employees and encapsulating their relationships and interactions. The `NetworkAnalyzer` class is responsible for processing commands and performing the relationship analysis.

- **Class Design:** Classes were created to separate the concerns and make the code more modular.
- **Command Processing:** Commands are processed line by line from the provided file, allowing easy extendability for additional command types.
- **Analyzing Relationships:** Relationships are analyzed and printed at the end of processing to determine the strongest relationship for each company.
- **Dependency Injection** Injected dependencies like the file reader and console instead of relying on global dependencies. This way, we can mock these during testing.

## 📝 Assumptions and Edge Cases

- **Assumptions about Input Data:**

  - The input file must follow the specific command format.
  - Companies and Partners must be defined before Employees and Contacts.
  - Employee names and company names are unique.

- **Possible Edge Cases:**
  - Handling of missing or malformed commands.
  - Handling of duplicate commands for the same entity.
