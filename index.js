/**
 * TODO:
 * command line arguments:
 *  - path to tomls
 *  - exchange, currency, assets
 * [a welcome log]
 * move config file creation to extra file
 * make log class
 */
const fs = require('fs');
const tomlToJson = require('./toml-to-json');
const pathToToml = '../config/strategies';
const pathToCofigDir = '../backtest-config';
const pathToSampleConfig = './sample-config.js';
let verbose = true;

function writeConfigFile(strategyObj, pathToCofigDir) {
  try {
    strategyObj = JSON.parse(strategyObj);
  } catch {
    console.error('failed to parse json');
    return;
  }

  if (!fs.existsSync(pathToCofigDir)) {
    fs.mkdirSync(pathToCofigDir);
    print(`created directory '${pathToCofigDir}'.`);
  }

  if (pathToCofigDir.charAt(pathToCofigDir.length - 1) !== '/') {
    pathToCofigDir += '/';
  }

  const pathToConfigFile = `${pathToCofigDir}${strategyObj.strategyName}.js`;
  const configFileContent = modifySampleConfig(strategyObj)

  try {
    fs.writeFileSync(pathToConfigFile, configFileContent);
    print(`created file '${pathToConfigFile}'.`);
  } catch (error) {
    console.error(`failed to write '${pathToConfigFile}' to disk.`);
  }
}

function modifySampleConfig(strategyObj) {
    if(!fs.existsSync(pathToSampleConfig)) {
        console.error('fatal error, sample config not found!');
        return "";
    }

    const fileContent = fs.readFileSync(pathToSampleConfig, {
        encoding: 'utf-8',
        flag: 'r',
      });

    let fileContentAsArray = fileContent.split("\n");
    let configFileContent = "";

    fileContentAsArray.forEach(line => {
        if(line.indexOf('method:') !== -1) {
            line = `  method: "${strategyObj.strategyName}",`
        }
        configFileContent += line + "\n";
    });
    configFileContent += `config.${strategyObj.strategyName} = ${JSON.stringify(strategyObj.strategyConfig)}\n`;
    
    return configFileContent;
}

function print(message) {
  if (verbose) {
    console.log(message);
  }
}

tomlToJson(pathToToml).forEach(json => {
  writeConfigFile(json, pathToCofigDir);
});
