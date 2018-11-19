// Everything is explained here:
// @link https://gekko.wizb.it/docs/commandline/plugins.html

var config = {};

config.debug = true;

config.watch = {
  exchange: 'binance',
  currency: 'USDT',
  asset: 'BTC',
}

config.tradingAdvisor = {
  enabled: true,
  method: 'MACD',
  candleSize: 60,
  historySize: 10,
}

config.paperTrader = {
  enabled: true,
  reportInCurrency: true,
  simulationBalance: {
    asset: 1,
    currency: 100,
  },
  feeMaker: 0.15,
  feeTaker: 0.25,
  feeUsing: 'maker',
  slippage: 0.05,
}

config.performanceAnalyzer = {
  enabled: true,
  riskFreeReturn: 5
}

config.trader = {
  enabled: false,
  key: '',
  secret: '',
  username: '',
  passphrase: '',
}

config.eventLogger = {
  enabled: false,
}

config.pushover = {
  enabled: false,
  sendPushoverOnStart: false,
  muteSoft: true,
  tag: '[GEKKO]',
  key: '',
  user: ''
}

config.mailer = {
  enabled: false,
  sendMailOnStart: true,
  email: '',
  muteSoft: true,
  password: '',
  tag: '[GEKKO] ',
  server: 'smtp.gmail.com',
  smtpauth: true,
  user: '',
  from: '',
  to: '',
  ssl: true,
  port: '',
}

config.pushbullet = {
  enabled: false,
  sendMessageOnStart: true,
  sendOnAdvice: true,
  sendOnTrade: true,
  muteSoft: true,
  key: '',
  email: 'jon_snow@westeros.com',
  tag: '[GEKKO]'
};

config.kodi = {
  host: 'http://ip-or-hostname:8080/jsonrpc',
  enabled: false,
  sendMessageOnStart: true,
}

config.ircbot = {
  enabled: false,
  emitUpdates: false,
  muteSoft: true,
  channel: '#your-channel',
  server: 'irc.freenode.net',
  botName: 'gekkobot'
}

config.telegrambot = {
  enabled: false,
  emitTrades: false,
  token: 'YOUR_TELEGRAM_BOT_TOKEN',
};

config.twitter = {
  enabled: false,
  sendMessageOnStart: false,
  muteSoft: false,
  tag: '[GEKKO]',
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};

config.xmppbot = {
  enabled: false,
  emitUpdates: false,
  client_id: 'jabber_id',
  client_pwd: 'jabber_pw',
  client_host: 'jabber_server',
  client_port: 5222,
  status_msg: 'I\'m online',
  receiver: 'jabber_id_for_updates'
}

config.campfire = {
  enabled: false,
  emitUpdates: false,
  nickname: 'Gordon',
  roomId: null,
  apiKey: '',
  account: ''
}

config.redisBeacon = {
  enabled: false,
  port: 6379,
  host: '127.0.0.1',
  channelPrefix: '',
  broadcast: [
    'candle'
  ]
}

config.slack = {
  enabled: false,
  token: '',
  sendMessageOnStart: true,
  muteSoft: true,
  channel: ''
}

config.ifttt = {
  enabled: false,
  eventName: 'gekko',
  makerKey: '',
  muteSoft: true,
  sendMessageOnStart: true
}

config.candleWriter = {
  enabled: true
}

config.adviceWriter = {
  enabled: false,
  muteSoft: true,
}

config.backtestResultExporter = {
  enabled: false,
  writeToDisk: false,
  data: {
    stratUpdates: false,
    portfolioValues: true,
    stratCandles: true,
    roundtrips: true,
    trades: true
  }
}

config.adapter = 'sqlite';
config.sqlite = {
  path: 'plugins/sqlite',
  dataDirectory: 'history',
  version: 0.1,
  journalMode: require('./web/isWindows.js') ? 'DELETE' : 'WAL',
  dependencies: []
}

config.postgresql = {
  path: 'plugins/postgresql',
  version: 0.1,
  connectionString: 'postgres://user:pass@localhost:5432',
  database: null,
  schema: 'public',
  dependencies: [{
    module: 'pg',
    version: '7.4.3'
  }]
}

config.mongodb = {
  path: 'plugins/mongodb',
  version: 0.1,
  connectionString: 'mongodb://localhost/gekko',
  dependencies: [{
    module: 'mongojs',
    version: '2.4.0'
  }]
}

config.backtest = {
  daterange: 'scan',
  batchSize: 50
}

config.importer = {
  daterange: {
    from: "2017-11-01 00:00:00",
    to: "2017-11-20 00:00:00"
  }
}

module.exports = config;
