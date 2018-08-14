/*NPM LIBS*/
/*For react*/
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const StaticRouter = require('react-router-dom').StaticRouter;
const matchPath = require('react-router-dom').matchPath;

/*For server*/
const Helmet = require('react-helmet').Helmet;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  default: {
    assets: false,
  }
});

/*CUSTOM MODULES*/
/*React elements and helpers*/
import App from '$containers/App';
import routes from '$apiFolder/routes';
const template = require('./template');

/*Configs and routing*/
const commentsRouter = require('./routes/comments');
const subscribeRouter = require('./routes/subscribe');

/*System vars*/
const isDevelopment = process.env.NODE_ENV === 'development';
let app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (args.assets) {
  //if need to use it but now is nginx get static --assets option enable static
  app.use(express.static('./dist/public'));
}

/*Some custom client side api or proxy api with nodejs*/
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/subscribe', subscribeRouter);

app.use((req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.path, route)) || {};
  const helmet = Helmet.renderStatic();
  /*Pass initial data before component loading from function*/
  const promise = activeRoute.getInitialData ? activeRoute.getInitialData(req.path) : Promise.resolve();
  /*Parse GET query string*/
  const query = req.query;
  /*Pass custom params if need*/
  const params = {};

  params.myParam = 'parameter';

  promise.then((data) => {
    let context = {};
    if (data) {
      context = data.data;
    }

    const body = renderToString(
        <StaticRouter location={req.url} context={{context, query, params}}>
          <App />
        </StaticRouter>
    );

    res.send(template({data: {context, query}, body, helmet}))
  }).catch(next)
});

export default app;

