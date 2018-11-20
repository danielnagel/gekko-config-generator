/**
 * Logs all given events.
 * Knows a log level.
 * Is the log Level >= 1 then all messages will be printed.
 * Is the log Level >= 2 then only warnings and errors will be printed.
 * Is the log Level >= 3 then only errors will be printed.
 * welcome and succes will always be printed.
 */

// import packages
const chalk = require("chalk");

class Logger {
  constructor(logLevel) {
    if (typeof logLevel === "number") {
      this.logLevel = logLevel;
    } else {
      this.logLevel = 3;
    }
  }

  /**
   * Prints a welcome message.
   */
  welcome() {
    console.log(chalk.bold.blue("gekko config generator"));
    console.log("version: 0.3.0");
    console.log("author: Daniel Nagel, github: danisenpai");
    console.log();
  }

  /**
   * Prints white text to the console.
   * The logLevel has to be 1 or bellow
   *
   * @param {string} message
   */
  info(message) {
    if (this.logLevel <= 1) {
      console.log(message);
    }
  }

  /**
   * Prints yellow text to the console.
   * The logLevel has to be 2 or bellow
   *
   * @param {string} message
   */
  warning(message) {
    if (this.logLevel <= 2) {
      console.log(chalk.yellow(`warning: ${message}`));
    }
  }

  /**
   * Prints red text to the console.
   * The logLevel has to be 3 or bellow
   *
   * @param {string} message
   */
  error(message) {
    if (this.logLevel <= 3) {
      console.log(chalk.bold.red(`error: ${message}`));
    }
  }

  /**
   * Prints green text to the console.
   *
   * @param {string} message
   */
  success(message) {
    console.log(chalk.green(message));
  }
}

// export modules
module.exports = Logger;
