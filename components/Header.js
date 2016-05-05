import React, {Component} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {
		ResponsiveNavigation,
		TopBarTitle,
		TopBarLeft,
		TopBarRight,
		Menu,
		MenuItem
} from 'react-foundation';

class Header extends Component {
	/*toggleMenu(e) {
		e.preventDefault();
		const menu = document.getElementById('headerMenu');
		menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
	}*/
	handleSubmit(e) {
		e.preventDefault();
		const val = this.refs.search.value || '';
		browserHistory.push(`/search/${val}`);
	}
	handleKeyup(e) {
		const code = (typeof e.which === 'number') ? e.which : e.keyCode;
		if(code === 13) {
			this.handleSubmit(e);
		}
	}
  render() {
    return (
	    <ResponsiveNavigation className="navbar">
		    <TopBarTitle>POC Brand Site</TopBarTitle>
		    <TopBarLeft>
			    <Menu>
				    <MenuItem><IndexLink to="/">Home</IndexLink></MenuItem>
				    <MenuItem><Link to="/products/multirotor" activeStyle={{ color: '#00d8ff' }}>MultiRotor</Link></MenuItem>
				    <MenuItem><Link to="/products/helicopters" activeStyle={{ color: '#00d8ff' }}>Helicopters</Link></MenuItem>
			    </Menu>
		    </TopBarLeft>
		    <TopBarRight>
			    <Menu>
				    <MenuItem>
					    <input ref="search" type="search" placeholder="Search" onKeyUp={(e) => this.handleKeyup(e)} />
				    </MenuItem>
				    <MenuItem>
					    <button type="button" className="button" onClick={(e) => this.handleSubmit(e)}>Search</button>
				    </MenuItem>
			    </Menu>
		    </TopBarRight>
	    </ResponsiveNavigation>
    )
  }
}

export default Header;