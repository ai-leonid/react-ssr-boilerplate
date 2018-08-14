import React from 'react';
import {NavLink} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import './NotFound404.pcss';


class NotFound404 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="section not-found-404">
          <div className="not-found-text">
            <p>404 not found</p>
          </div>
        </section>
    );
  }
}

export default NotFound404;


