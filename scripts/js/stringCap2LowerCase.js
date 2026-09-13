const fs = require('fs');
const readline = require('readline');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'output.csv';

if (!inputFile) {
  console.error('Usage: node script.js <input.csv> [output.csv]');
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity
});

const writeStream = fs.createWriteStream(outputFile);

rl.on('line', (line) => {
  writeStream.write(line.toLowerCase() + '\n');
});

rl.on('close', () => {
  writeStream.end();
  console.log('Done!');
});
// node script.js input.csv              # output goes to output.csv
// node script.js input.csv result.csv   # custom output path
