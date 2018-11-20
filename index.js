/**
 * TODO:
 * [a welcome log]
 * make log class
 */

const program = require("commander");
const tomlToJson = require("./lib/toml-to-json");
const configGenerator = require("./lib/config-generator");
const pathToToml = "config/strategies";
const pathToConfigDir = "backtest-config";

// default arguments
let path = "./";
let exchange = "binance";
let currency = "USDT";
let asset = "BTC";

program
  .version("0.2.0")
  .option("-p, --path <value>", "path to gekko")
  .option("-e, --exchange <value>", "specify the exchange")
  .option("-c, --currency <value>", "specify the currency")
  .option("-a, --asset <value>", "specify the asset")
  .parse(process.argv);

if (typeof program.path !== "undefined") path = program.path;
if (typeof program.exchange !== "undefined") exchange = program.exchange;
if (typeof program.currency !== "undefined") currency = program.currency;
if (typeof program.asset !== "undefined") asset = program.asset;

if (path.charAt(path.length - 1) !== "/") path += "/";

const options = `{"exchange": "${exchange}", "currency": "${currency}", "asset": "${asset}"}`;

tomlToJson(`${path}${pathToToml}`).forEach(json => {
  configGenerator(json, options, `${path}${pathToConfigDir}`);
});
