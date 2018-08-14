import React from 'react';
import './Footer.pcss';

let date = new Date();

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }
  render() {
    return (
        <footer className="footer">
          <div className="footer-copyright">My company © 1970-{date.getFullYear()}. All rights reserved.</div>
        </footer>
    );
  }
}

export default Footer;






