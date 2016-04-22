import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="row">
        <div className="small-6 columns">
          © 2016 Wayne Patterson
        </div>
        <div className="small-6 columns text-right">
          Fork me on <a href="https://github.com/suprsidr/react-product-pages">Github</a>
        </div>
      </footer>
    )
  }
}