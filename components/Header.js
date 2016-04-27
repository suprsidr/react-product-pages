import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div className="top-bar" role="nav">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text hide-for-small-only">POC Brand Site</li>
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/products/multirotor" activeStyle={{ color: '#00d8ff' }}>MultiRotor</Link></li>
            <li><Link to="/products/helicopters" activeStyle={{ color: '#00d8ff' }}>Helicopters</Link></li>
            <li><Link to="/search" activeStyle={{ color: '#00d8ff' }}>Search</Link></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu show-for-medium">
            <li>Built with</li>
            <li>
              <a className="react-link" href="https://facebook.github.io/react/">
                <img width="36" height="36" src="img/react-logo.svg"/>
                React
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}