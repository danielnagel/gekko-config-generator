const fs = require('fs');
const toml = require('toml');

function getFileExtension(file) {
  if (typeof file !== 'string') {
    return '';
  }

  const indexOfDot = file.indexOf('.') + 1;
  return file.substr(indexOfDot);
}

function getFileName(file) {
  if (typeof file !== 'string') {
    return '';
  }

  while (file.indexOf('-') !== -1) file = file.replace('-', '_');

  const indexOfDot = file.indexOf('.');
  return file.substr(0, indexOfDot);
}

function isTOML(file) {
  return getFileExtension(file) === 'toml';
}

function getTomlFilesAsJSONArray(pathToTomlFiles) {
  if (!fs.existsSync(pathToTomlFiles)) {
    console.error(`The path '${pathToTomlFiles}' does not exist.`);
    return [];
  }

  const dirContent = fs.readdirSync(pathToTomlFiles);
  if (dirContent.length < 0) {
    console.error(`No toml Files found under '${pathToTomlFiles}'.`);
  }

  if (pathToTomlFiles.charAt(pathToTomlFiles.length - 1) !== '/') {
    pathToTomlFiles += '/';
  }

  let jsonArray = [];

  dirContent.forEach(file => {
    if (isTOML(file)) {
      const fileContent = fs.readFileSync(`${pathToTomlFiles}${file}`, {
        encoding: 'utf-8',
        flag: 'r',
      });

      const resultString = `{ "strategyName": "${getFileName(file)}", "strategyConfig": ${JSON.stringify(toml.parse(fileContent))}}`;

      jsonArray.push(resultString);
    }
  });

  return jsonArray;
}

module.exports = getTomlFilesAsJSONArray;
