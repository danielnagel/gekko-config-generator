/**
 * This script uses the package 'toml', from binarymuse,
 * to parse all toml files, inside a directory,
 * into JSON formated strings.
 */

// import packages
const fs = require("fs");
const toml = require("toml");

/**
 * Gets the substring after the last dot in a string.
 * 
 * @param {string} fileName
 */
function getFileExtension(fileName) {
  if (typeof fileName !== "string") {
    return "";
  }

  const indexOfDot = fileName.lastIndexOf(".") + 1;
  return fileName.substr(indexOfDot);
}

/**
 * Gets the substring before the first dot in a string.
 * 
 * @param {string} fileName
 */
function getFileName(fileName) {
  if (typeof fileName !== "string") {
    return "";
  }

  // javascript interpretes '-' as an operator
  while (fileName.indexOf("-") !== -1) fileName = fileName.replace("-", "_");

  const indexOfDot = fileName.indexOf(".");
  return fileName.substr(0, indexOfDot);
}

/**
 * Checks if a string ends with the subtring 'toml'.
 * 
 * @param {string} fileName
 */
function isTOML(fileName) {
  return getFileExtension(fileName) === "toml";
}

/**
 * Parses all toml files inside the 'pathToTomlFiles' directory
 * into an array of JSON formatted strings.
 * 
 * @param {string} pathToTomlFiles
 * @param {Logger} log  Logger class which logs the events
 *                      during the process of parsing.
 */
function getTomlFilesAsJSONArray(pathToTomlFiles, log) {
  if (!fs.existsSync(pathToTomlFiles)) {
    log.error(`The path '${pathToTomlFiles}' does not exist.`);
    return [];
  }

  const dirContent = fs.readdirSync(pathToTomlFiles);
  if (dirContent.length < 0) {
    log.error(`No toml Files found under '${pathToTomlFiles}'.`);
  }

  if (pathToTomlFiles.charAt(pathToTomlFiles.length - 1) !== "/") {
    pathToTomlFiles += "/";
  }

  let jsonArray = [];

  dirContent.forEach(file => {
    if (isTOML(file)) {
      const fileContent = fs.readFileSync(`${pathToTomlFiles}${file}`, {
        encoding: "utf-8",
        flag: "r"
      });

      const resultString = `{ "strategyName": "${getFileName(
        file
      )}", "strategyConfig": ${JSON.stringify(toml.parse(fileContent))}}`;
      log.info(`pared toml file to json: ${resultString}`);

      jsonArray.push(resultString);
    }
  });

  return jsonArray;
}

// export modules
module.exports = getTomlFilesAsJSONArray;
