/**
 * This script generates,
 * with the sample-config.js and the JSON formatted toml files,
 * new config files for gekko backtests.
 */

// import packages
const fs = require("fs");
const pathToSampleConfig = "./lib/assets/sample-config.js";

/**
 * Creates the config files for gekko backtest
 * and writes them into the 'pathToConfigDir' directory.
 *
 * @param {Object} strategyObj    object with the strategy name
 *                                and configuration from the toml file.
 * @param {Object} options        object with the exchange, currency and asset,
 *                                specified from the user.
 * @param {string} pathToCofigDir path where the config files should be stored.
 * @param {Logger} log            Logger class which logs the events
 *                                during the process of parsing.
 */
function writeConfigFile(strategyObj, options, pathToCofigDir, log) {
  // parse strategy object
  try {
    strategyObj = JSON.parse(strategyObj);
  } catch (error) {
    log.error(`failed to parse strategy json, ${error}`);
    return;
  }

  // parse options object
  try {
    options = JSON.parse(options);
  } catch (error) {
    log.error(`failed to parse options json, ${error}`);
    process.exit();
  }

  // merge strategies and options to one object
  strategyObj = { ...strategyObj, ...options };

  // create the config dir
  if (!fs.existsSync(pathToCofigDir)) {
    fs.mkdirSync(pathToCofigDir);
    log.info(`created directory '${pathToCofigDir}'.`);
  }

  if (pathToCofigDir.charAt(pathToCofigDir.length - 1) !== "/") {
    pathToCofigDir += "/";
  }

  const pathToConfigFile = `${pathToCofigDir}${strategyObj.strategyName}.js`;
  const configFileContent = modifySampleConfig(strategyObj);

  // write the config files to disk
  try {
    fs.writeFileSync(pathToConfigFile, configFileContent);
    log.info(`created file '${pathToConfigFile}'.`);
  } catch (error) {
    log.error(`failed to write '${pathToConfigFile}' to disk.`);
  }
}

/**
 * Modifys the given sample-config.js, in the assets directory,
 * with the given options, specified by the user,
 * and the strategy.
 *
 * @param {Object} strategyObj contains the options and strategy.
 */
function modifySampleConfig(strategyObj) {
  // if the sample-config wasn't found, kill the process!
  if (!fs.existsSync(pathToSampleConfig)) {
    log.error("fatal error, sample config not found!");
    process.exit();
  }

  // read the content of sample-config.js
  const fileContent = fs.readFileSync(pathToSampleConfig, {
    encoding: "utf-8",
    flag: "r"
  });

  // get the lines as an array
  let fileContentAsArray = fileContent.split("\n");
  let newFileContent = "";

  // paste the options into the new file content
  fileContentAsArray.forEach(line => {
    line = pasteOptions(line, strategyObj);
    newFileContent += line + "\n";
  });

  // add the strategy configuration at the end of the file
  newFileContent += `config.${strategyObj.strategyName} = ${JSON.stringify(
    strategyObj.strategyConfig
  )}\n`;

  return newFileContent;
}

/**
 * Pastes the given method, exchange, currency
 * or asset from the strategy object into the
 * currently viewed line.
 *
 * @param {string} line currently viewed line
 * @param {Object} obj strategy object
 */
function pasteOptions(line, obj) {
  if (line.indexOf("method: '") !== -1) {
    line = `  method: "${obj.strategyName}",`;
  }
  if (line.indexOf("exchange: '") !== -1) {
    line = `  exchange: "${obj.exchange}",`;
  }
  if (line.indexOf("currency: '") !== -1) {
    line = `  currency: "${obj.currency}",`;
  }
  if (line.indexOf("asset: '") !== -1) {
    line = `  asset: "${obj.asset}",`;
  }

  return line;
}

// export modules
module.exports = writeConfigFile;
