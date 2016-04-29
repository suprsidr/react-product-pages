import React, {Component} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';

class Header extends Component {
	toggleMenu(e) {
		e.preventDefault();
		const menu = document.getElementById('headerMenu');
		menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
	}
	handleSubmit(e) {
		e.preventDefault();
		const val = this.refs.search.value || '';
		browserHistory.push(`/search/${val}`);
	}
	handleKeyup(e) {
		const code = (typeof e.which === "number") ? e.which : e.keyCode;
		if(code === 13) {
			this.handleSubmit(e);
		}
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
		          </ul>
		        </div>
			      <div className="top-bar-right">
				      <ul className="menu">
					      <li><input ref="search" type="search" placeholder="Search" onKeyUp={(e) => this.handleKeyup(e)} /></li>
					      <li><button type="button" className="button" onClick={(e) => this.handleSubmit(e)}>Search</button></li>
				      </ul>
			      </div>
		      </div>
		    </div>
    )
  }
}

Header.contextTypes = {
	router: React.PropTypes.object
};

export default Header;