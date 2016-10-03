const fs = require('fs');
const SublimeTheme = require('../src/translators/SublimeTheme');

const file = fs.readFileSync('data/theme.tmTheme', 'utf8');
const theme = new SublimeTheme(file);

console.log(JSON.stringify(theme.content, null, 2));