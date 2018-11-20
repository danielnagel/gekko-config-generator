# gekko config generator
[![Donate with Bitcoin](https://en.cryptobadges.io/badge/small/3QT3SDTjk9bCLqfvqKt6Jenw4abgFhxw3x)](https://en.cryptobadges.io/donate/3QT3SDTjk9bCLqfvqKt6Jenw4abgFhxw3x)
[![Donate with Ethereum](https://en.cryptobadges.io/badge/small/0x3f83705709583f6ec7626c9e86256f2374d26477)](https://en.cryptobadges.io/donate/0x3f83705709583f6ec7626c9e86256f2374d26477)

The gekko-config-generator creates a config.js, for [gekko](https://github.com/askmike/gekko) backtest, for every toml files in the strategies directory.

It parses all toml files, inside the 'gekko/config/strategies' directory,
into JSON formated strings. And then creates the config files for gekko backtest
and writes them into the 'gekko/backtest-config' directory.

## Getting Started

This Tool is relatively easy to install and run.

### Prerequisites

Before you can start you need to install [node.js](https://nodejs.org/en/), [gekko](https://github.com/askmike/gekko) and [Gekko-Strategies](https://github.com/xFFFFF/Gekko-Strategies).

I will only describe how to install these prerequisites under debian, because I am a debian user.

```
# Node.js
su
curl -sL https://deb.nodesource.com/setup_10.x | -E bash -
apt-get install -y nodejs

# Gekko
git clone https://github.com/askmike/gekko.git

# Install dependencies for gekko
cd gekko
npm i
npm i tulind --build-from-source
npm i talib
cd exchange
npm i

# Gekko-strategies
git clone https://github.com/gekkowarez/Gekko-Strategies

cd Gekko-Strategies
bash install.sh
```

You don't have to install the Gekko-Strategies for this tool, but gekko's default strategies are already configured in it's sample-config.js.

### Installing

After you are done with the prerequisites you can install the gekko config generator.

```
git clone https://github.com/danisenpai/gekko-config-generator.git
cd gekko-config-generator
npm i
```

At this point you can start using the gekko-config-generator.

```
# getting help
node gcg -h

# if you installed gekko-config-generator inside the gekko dir
# you can start the script with the default parameters.
# path: '.', exchange: 'binance', currency: 'USDT', asset: 'BTC'
node gcg

# or use the parameters to fit your needs.
Usage: gcg [options]

Options:
  -V, --version           output the version number
  -p, --path <value>      path to gekko
  -e, --exchange <value>  specify the exchange
  -c, --currency <value>  specify the currency
  -a, --asset <value>     specify the asset
  -l, --loglevel <value>  set the log level, info/all(1), warning(2), error(3), nothing(4)
  -h, --help              output usage information

# after generation, change to your gekko folder and run a backtest
node gekko -c backtest-config/strategyname.js --backtest
```

## Authors

- **Daniel Nagel** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

A big thanks to the authors of the npm modules

- [toml](https://github.com/BinaryMuse/toml-node)
- [chalk](https://github.com/chalk/chalk)

And Askmike for gekko

- [gekko](https://github.com/askmike/gekko)

## Note

1. English is not my native language, if you find some misspellings or misused grammar, please let me know.
2. Feel free to contribute to my code or criticize it, but tell me what you don't like about it.
3. Leave a tip, if this tool helped you in any way.
