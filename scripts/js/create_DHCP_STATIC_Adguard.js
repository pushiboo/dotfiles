const fs = require('fs');

// Read file path from command line: node script.js input.csv [output.txt]
const csvPath = process.argv[2];
const outputPath = process.argv[3] || 'dhcp_static.yml';
const myDomain = '.push'
const setActive = true

if (!csvPath) {
    console.error('Usage: node script.js <input.csv> [output.txt]');
    process.exit(1);
}

const csvData = fs.readFileSync(csvPath, 'utf8');

const lines = csvData.split('\n').filter(line => line.trim() !== '');
const rewrites = lines.map(line => {
    const [name, ip, mac] = line.split(',');
    return `- 'mac^': '${mac.trim()}'
  'name': '${name.trim()}'
  'ip': '${ip}'`;
}).join('\n');

fs.writeFileSync(outputPath, rewrites, 'utf8');
console.log(`Written to ${outputPath}`);   
