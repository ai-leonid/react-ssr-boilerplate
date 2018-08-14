import '$modules/polyfills.js';

import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';

import App from '$containers/App';

hydrate((
    <Router>
      <App/>
    </Router>
), document.querySelector('#react-root'));


if (module.hot) {
  module.hot.accept('$containers/App', () => {
    hydrate(
        (<AppContainer>
          <Router>
            <App/>
          </Router>
        </AppContainer>),
        document.querySelector('#root'),
    );
  });
}
