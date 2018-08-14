import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';

/*Common styles*/
import '$styles/modules/_base.pcss';
/*Service modules for testing*/
import '$styles/service/_debug.pcss';
/* Design elements */
import '$styles/modules/_icons.pcss';
import '$styles/modules/_animations.pcss';
/*Some HACKS for compatibility*/
import '$styles/compability/_ie.pcss';
import '$styles/compability/_mobile.pcss';
/*Some modifiers*/
import '$styles/modules/_helpers.pcss';

import {pageTitles} from '$modules/constants';
import NotFound404Page from '$pages/NotFound404Page';
import routes from '$apiFolder/routes';

class App extends Component {
  render() {
    return (
      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
                <Component {...props} {...rest} />
            )} />
        ))}
        <Route component={(props) =>
            <NotFound404Page {...props} title={pageTitles.notFound404Page}/>}/>
      </Switch>
    );
  }
}

export default hot(module)(App);


