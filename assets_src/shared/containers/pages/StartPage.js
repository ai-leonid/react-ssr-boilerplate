import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import Layout from '$components/Layout/Layout';
import HelloWorld from '$components/HelloWorld/HelloWorld';

class StartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialData: '',
    };
  }

  getInitialData = () => {
    this.props.getInitialData().then((data) => {
      this.setState(() => ({
        initialData: data.data,
      }));
    });
  };

  componentDidUpdate () {
    //console.log(this.props);
  };

  componentDidMount() {
    console.log(this.props);
    if (!this.state.initialData || Object.keys(this.state.initialData).length === 0) {
      this.getInitialData()
    }
  }

  render() {
    return (
        <Layout>
          <Helmet>
            <title>{this.props.title}</title>
          </Helmet>
          <HelloWorld someInitialData={this.state.initialData}/>
        </Layout>
    );
  }
}

export default StartPage;
