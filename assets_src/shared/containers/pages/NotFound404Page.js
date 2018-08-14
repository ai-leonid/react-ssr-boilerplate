import React from 'react';
import {Helmet} from 'react-helmet';

import Layout from '$components/Layout/Layout';

import NotFound404 from '$components/NotFound404/NotFound404';

class NotFound404Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Layout>
          <Helmet>
            <title>{this.props.title}</title>
          </Helmet>
          <NotFound404/>
        </Layout>
    );
  }
}

export default NotFound404Page;


