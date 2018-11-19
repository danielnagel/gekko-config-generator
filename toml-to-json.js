/**
 * TODO:
 * build config file for every strategy.
 * Issues:
 * jazzbre point in variable name is not good.
 */

const fs = require('fs');

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

function buildJSONFromToml(content) {
  let json = '{';
  let openingSubBracket = 0;
  content.forEach(line => {
    if (line.charAt(0).match(/[a-z]/i)) {
      // a variable
      line = line.replace(' =', ':');
      while (line.indexOf('"') !== -1) line = line.replace('"', "'");

      let comment = line.indexOf('#');
      if (comment !== -1) {
        if (line.lastIndexOf('#') !== comment) {
          // comment after a variable with the value '#'
          line = line.substr(0, line.lastIndexOf('#'));
        } else if (
          line.charAt(comment - 1) === "'" ||
          line.charAt(comment - 1) === '"'
        ) {
          // variable with the value '#', do nothing
        } else {
          // comment after variable
          line = line.substr(0, comment - 1);
        }
      }

      line += ', ';
    } else if (line.charAt(0) === '[') {
      // an [object]
      openingSubBracket++;
      line = line.replace('[', '');
      line = line.replace(']', '');
      line += ': {';
    } else if (line.charAt(0) === '#') {
      // a comment
      line = '';
    } else {
      // blank line
      if (openingSubBracket) {
        // blank line after an [object]
        if (json.charAt(json.length - 3) === ':') {
          // if there was a new [object], but it has no values in it, delete the object
          const lastComma = json.lastIndexOf(',');
          json = json.substr(0, lastComma);
        } else {
          json = json.substr(0, json.length - 2);
          line = '}, ';
        }
        openingSubBracket--;
      } else {
        line = '';
      }
    }

    json += line;
  });

  if (json.charAt(json.length - 2) === ',') {
    json = json.substr(0, json.length - 2);
  }

  while (openingSubBracket > 0) {
    json += '}';
    openingSubBracket--;
  }

  json += '}';
  return json;
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

      let contentLines = '';
      if (fileContent.indexOf('\r\n') !== -1) {
        // File written under windows
        contentLines = fileContent.split('\r\n');
      } else {
        // File written under unix like system
        contentLines = fileContent.split('\n');
      }

      jsonArray.push(
        `{ "strategyName": "${getFileName(
          file
        )}", "strategyConfig": "${buildJSONFromToml(contentLines)}"}`
      );
    }
  });

  return jsonArray;
}

module.exports = getTomlFilesAsJSONArray;
