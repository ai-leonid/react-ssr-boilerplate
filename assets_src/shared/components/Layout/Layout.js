import React, {Fragment} from 'react';

import Header from '$components/Header/Header';
import Footer from '$components/Footer/Footer';

import './Layout.pcss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {

    return (
        <Fragment>
          <Header/>
          <main className="main">
            {this.props.children}
          </main>
          <Footer/>
        </Fragment>
    );
  }
}

export default Layout;
