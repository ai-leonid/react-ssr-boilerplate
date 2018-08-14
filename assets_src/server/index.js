const http = require('http');
const minimist = require('minimist');
const express = require('express');
import app from './server';

const isDevelopment = process.env.NODE_ENV === 'development';
const isHot = __isHot__;

const args = minimist(process.argv.slice(2), {
  string: 'port',
  alias: { h: 'help', v: 'version' },
  default: {
    port: '8080',
    version: '0.0.1',
    help: '--port NUMBER, -port=NUMBER, --port=NUMBER; --v, -version - version, --h, -help - mini help'
  }
});

if (isHot) {
  const server = http.createServer(app);
  let currentApp = app;
  server.listen(args.port);

  if (module.hot) {
    module.hot.accept('./server', () => {
      console.log('-----------RELOAD SERVER------------');
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    });
  }
} else {
  app.listen(args.port)
}

/*--------------------------*/
console.log('');
console.log(`Help: ${args.help}`);
console.log(`Server running on localhost:${args.port}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Development mode: ${isDevelopment}`);
console.log(`Argv: ${process.argv}`);

