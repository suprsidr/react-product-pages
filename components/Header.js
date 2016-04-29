import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

export default class Header extends Component {
	toggleMenu(e) {
		e.preventDefault();
		const menu = document.getElementById('headerMenu');
		const view = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
		menu.style.display = view;
	}
  render() {
    return (
		    <div>
			    <div className="title-bar" data-responsive-toggle="headerMenu" data-hide-for="medium">
				    <button className="menu-icon" type="button" data-toggle onClick={(e) => this.toggleMenu(e)}></button>
				    <div className="title-bar-title">Menu</div>
			    </div>
		      <div className="top-bar" role="nav" id="headerMenu">
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
		          <ul className="menu show-for-large">
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
		    </div>
    )
  }
}