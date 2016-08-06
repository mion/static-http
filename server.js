#!/usr/bin/env node
var program = require("commander")
  , colors = require("colors")
  , express = require("express");

program
  .version("1.0.0")
  .description("Serve static files through HTTP")
  .usage("[options] <dir>")
  .option("-p, --port <port>", "Specify on which port to run the HTTP server", /^\d+$/i, "3600")
  .parse(process.argv);

if (program.args.length === 0) {
  console.log("[ERROR] You need to specify a directory.");
  var makeRed = function (txt) { return colors.red(txt); };
  program.outputHelp(makeRed);
} else {
  var app = express()
    , dir = program.args[0]
    , port = parseInt(program.port);

  app.use(express.static(dir));

  app.listen(port, function () {
    console.log("[*] Static server running on port "+port+", serving files from: " + dir);
  });
}
