import React from 'react';
import {Helmet} from 'react-helmet';

import './Header.pcss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
        <header id="home" className="header container container-float-fix">
          <Helmet>
            <meta property="og:title" content="Page title opengraph"/>
          </Helmet>
          <div className="header-logo"><a href="/"><img src="https://picsum.photos/100/100" alt=""/></a></div>
        </header>
    );
  }
}

export default Header;

