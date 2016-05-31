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
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    document.querySelector('.title-bar-title').innerHTML = document.querySelector('.top-bar-title').innerHTML;
    this.menuItems = Array.from(document.querySelectorAll('.navbar .menu a'));
    this.menuItems.forEach((item) => {
      item.addEventListener('click', () => this.handleMenuItemClick(), false);
    })
  }
  handleMenuItemClick() {
    if(document.querySelector('.title-bar.hide')) {
      return;
    } else {
      document.querySelector('.menu-icon').click();
    }
  }
	handleSubmit(e) {
		e.preventDefault();
		const val = this.refs.search.value || '';
    if(this.context.inApp === undefined) {
      location.href = `/search/${val}`;
    } else {
      browserHistory.push(`/search/${val}`);
    }
    this.handleMenuItemClick();
	}
	handleKeyup(e) {
		const code = (typeof e.which === 'number') ? e.which : e.keyCode;
		if(code === 13) {
			this.handleSubmit(e);
		}
	}
  static contextTypes = {
    inApp: React.PropTypes.bool
  };
  render() {
    return (
	    <ResponsiveNavigation className="navbar">
		    <TopBarTitle>{(this.context.inApp === undefined) ? <a href="/">POC Brand Site</a> :
          <IndexLink to="/">POC Brand Site</IndexLink>}</TopBarTitle>
		    <TopBarLeft>
			    <Menu>
				    <MenuItem>{(this.context.inApp === undefined) ? <a href="/products/multirotor">MultiRotor</a> :
              <Link to="/products/multirotor" activeStyle={{ color: '#00d8ff' }}>MultiRotor</Link>}</MenuItem>
				    <MenuItem>{(this.context.inApp === undefined) ? <a href="/products/helicopters">Helicopters</a> :
              <Link to="/products/helicopters" activeStyle={{ color: '#00d8ff' }}>Helicopters</Link>}</MenuItem>
            <MenuItem>{(this.context.inApp === undefined) ? <a href="/video">Videos</a> :
              <Link to="/video" activeStyle={{ color: '#00d8ff' }}>Videos</Link>}</MenuItem>
            <MenuItem><a href="/storelocator">Storelocator</a></MenuItem>
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
