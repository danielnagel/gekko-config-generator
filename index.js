/**
 * Main script of the project 'gekko config generator'.
 */

// import packages
const program = require("commander");
const tomlToJson = require("./lib/toml-to-json");
const configGenerator = require("./lib/config-generator");
const Logger = require("./lib/logger");

// constant variables
const pathToToml = "config/strategies";
const pathToConfigDir = "backtest-config";

// default arguments
let path = "./";
let exchange = "binance";
let currency = "USDT";
let asset = "BTC";
let logLevel = 3;

// parse command line arguments
program
  .version("0.3.0")
  .option("-p, --path <value>", "path to gekko")
  .option("-e, --exchange <value>", "specify the exchange")
  .option("-c, --currency <value>", "specify the currency")
  .option("-a, --asset <value>", "specify the asset")
  .option(
    "-l, --loglevel <value>",
    "set the log level, info/all(1), warning(2), error(3), nothing(4)"
  )
  .parse(process.argv);

if (typeof program.path !== "undefined") path = program.path;
if (typeof program.exchange !== "undefined") exchange = program.exchange;
if (typeof program.currency !== "undefined") currency = program.currency;
if (typeof program.asset !== "undefined") asset = program.asset;
if (typeof program.loglevel !== "undefined") logLevel = program.loglevel;

if (path.charAt(path.length - 1) !== "/") path += "/";

const options = `{"exchange": "${exchange}", "currency": "${currency}", "asset": "${asset}"}`;

// initialize logger
const log = new Logger(logLevel);
log.welcome();

// main function
tomlToJson(`${path}${pathToToml}`, log).forEach(json => {
  configGenerator(json, options, `${path}${pathToConfigDir}`, log);
});

log.success(`successfully created config files in '${path}${pathToConfigDir}'`);
