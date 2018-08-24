import React, {Component} from 'react';

import './HelloWorld.pcss';

class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
        <section className="container section hello-world">
            <h2 className="headline-2">Hello Component</h2>
            <h2>{this.props.someInitialData.title}</h2>
        </section>
    );
  }
}

export default HelloWorld;
