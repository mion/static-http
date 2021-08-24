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
  console.error(colors.red("[ERROR] You need to specify a directory."));
  program.outputHelp(function (txt) { return colors.yellow(txt); });
} else {
  var app = express()
    , dir = program.args[0]
    , port = parseInt(program.port);

  // fix NaN port bug
  if (!port) port = 3600;

  app.use(express.static(dir));
  app.listen(port, function () {
    console.log(colors.green("[*] Static server running on port "+port+", serving files from: " + dir));
  }).on("error", function (err) {
    if (err.errno === "EADDRINUSE") {
      console.error(colors.red("[ERROR] The specified port " + port + " is already in use."));
      console.log(colors.yellow("Please, choose another port."));
    } else {
      console.error(colors.red("[ERROR] An error occurred while trying to listen on port " + port + ":\n" + err));
    }
  });
}
