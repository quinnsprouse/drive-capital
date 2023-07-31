const { NetworkAnalyzer } = require("./main.js");

if (process.argv.length != 3) {
  console.log("Usage: node analyze_network.js <filename>");
  process.exit(1);
}

const analyzer = new NetworkAnalyzer();
analyzer.analyze(process.argv[2]);
