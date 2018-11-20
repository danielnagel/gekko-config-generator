const chalk = require("chalk");

class Logger {
  constructor(verbose) {
    if (typeof verbose === "number") {
      this.verbose = verbose;
    } else {
      this.verbose = 3;
    }
  }

  welcome() {
    console.log(chalk.bold.blue('gekko config generator'));
    console.log('version: 0.3.0');
    console.log('author: Daniel Nagel, github: danisenpai');
    console.log();
  }

  info(message) {
    if (this.verbose <= 1) {
      console.log(message);
    }
  }

  warning(message) {
    if (this.verbose <= 2) {
      console.log(chalk.yellow(`warning: ${message}`));
    }
  }

  error(message) {
    if (this.verbose <= 3) {
      console.log(chalk.bold.red(`error: ${message}`));
    }
  }

  success(message) {
    console.log(chalk.green(message));
  }
}

module.exports = Logger;
