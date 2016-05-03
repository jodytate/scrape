const argv = require('minimist')(process.argv.slice(2));
const notifier = require('node-notifier');
const winston = require('winston');
const Xray = require('x-ray');

const xray = Xray();
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: 'results_' + new Date().toISOString() + '.log',
      maxsize: 1048576
    })]
});

const minutes = 5;
const theInterval = minutes * 60 * 1000;
const url = argv.u || 'http://radiohead.com';

setInterval(function() {

  xray(url, 'title')((err, title) => {
    if (title) {
      logger.info('WE HAVE A TITLE TAG NOW.');
      notifier.notify({
        'title': url,
        'message': 'changed'
      });
    } else {
      logger.info('no changes');
    }
  })

}, theInterval);
