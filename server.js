#!/usr/bin/env node
var express = require('express');
var app = express();

var path = process.argv[2];
var port = process.argv[3];

app.use(express.static(path));

app.listen(1629, function () {
  console.log('[*] Static server running on port 1629, serving files from: ' + path);
});
