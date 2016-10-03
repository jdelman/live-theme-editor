const fs = require('fs');
const plist = require('plist');
const express = require('express');

const app = express();

const initialScheme = plist.parse(fs.readFileSync('theme.tmTheme', 'utf8'))
console.log(JSON.stringify(scheme, null, 2))

app.get('*', )