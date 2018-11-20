const fs = require("fs");
const pathToSampleConfig = "./lib/assets/sample-config.js";

function writeConfigFile(strategyObj, options, pathToCofigDir, log) {
  try {
    strategyObj = JSON.parse(strategyObj);
  } catch (error) {
    log.error(`failed to parse strategy json, ${error}`);
    return;
  }

  try {
    options = JSON.parse(options);
  } catch (error) {
    log.error(`failed to parse options json, ${error}`);
    process.exit();
  }

  strategyObj = { ...strategyObj, ...options};

  if (!fs.existsSync(pathToCofigDir)) {
    fs.mkdirSync(pathToCofigDir);
    log.info(`created directory '${pathToCofigDir}'.`);
  }

  if (pathToCofigDir.charAt(pathToCofigDir.length - 1) !== "/") {
    pathToCofigDir += "/";
  }

  const pathToConfigFile = `${pathToCofigDir}${strategyObj.strategyName}.js`;
  const configFileContent = modifySampleConfig(strategyObj);

  try {
    fs.writeFileSync(pathToConfigFile, configFileContent);
    log.info(`created file '${pathToConfigFile}'.`);
  } catch (error) {
    log.error(`failed to write '${pathToConfigFile}' to disk.`);
  }
}

function modifySampleConfig(strategyObj) {
  if (!fs.existsSync(pathToSampleConfig)) {
    log.error("fatal error, sample config not found!");
    process.exit();
  }

  const fileContent = fs.readFileSync(pathToSampleConfig, {
    encoding: "utf-8",
    flag: "r"
  });

  let fileContentAsArray = fileContent.split("\n");
  let configFileContent = "";

  fileContentAsArray.forEach(line => {
    line = pasteOptions(line, strategyObj);
    configFileContent += line + "\n";
  });
  configFileContent += `config.${strategyObj.strategyName} = ${JSON.stringify(
    strategyObj.strategyConfig
  )}\n`;

  return configFileContent;
}

function pasteOptions(line, obj) {
  if (line.indexOf("method: \'") !== -1) {
    line = `  method: "${obj.strategyName}",`;
  }
  if (line.indexOf("exchange: \'") !== -1) {
    line = `  exchange: "${obj.exchange}",`;
  }
  if (line.indexOf("currency: \'") !== -1) {
    line = `  currency: "${obj.currency}",`;
  }
  if (line.indexOf("asset: \'") !== -1) {
    line = `  asset: "${obj.asset}",`;
  }

  return line;
}

module.exports = writeConfigFile;
