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
    console.log(colors.green('\n\t[*]'), colors.bgGreen.black(' Static HTTP server running... '))
    console.log(colors.green('\t * '))
    console.log(colors.green('\t * '), colors.green('Port:'), colors.white(port.toString()))
    console.log(colors.green('\t * '), colors.green('Folder:'), colors.white(dir.toString()))
    console.log(colors.gray('\n\tWARNING\n\tAny files in that folder can be accessed if your IP is public!'))
    console.log('\n\tVisit', colors.cyan(`http://localhost:${port}`), 'URL to see your site.\n')
    console.log('\tPress', colors.yellow('Control + C'), 'to stop the server.\n')
  }).on("error", function (err) {
    if (err.errno === "EADDRINUSE") {
      console.error(colors.red("[ERROR] The specified port " + port + " is already in use."));
      console.log(colors.yellow("Please, choose another port."));
    } else {
      console.error(colors.red("[ERROR] An error occurred while trying to listen on port " + port + ":\n" + err));
    }
  });
}
