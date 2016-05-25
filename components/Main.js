import React, {Component} from 'react';
import {render} from 'react-dom';
import minimongo from 'minimongo';
import Header from './Header';
import Footer from './Footer';
import {fetchData} from '../config/utils';

export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      productsLoaded: false
    };
    this.LocalDb = minimongo.MemoryDb;
    // Create local db (in memory database with no backing)
    this.db = new this.LocalDb();
  }
  componentWillMount() {
    // setup minimongo collection
    this.db.addCollection('products');
	  // check localStorage support
	  this.localStorageSupported = this.storageAvailable('localStorage');
  }
  componentDidMount() {
	  let data = this.localStorageSupported && JSON.parse(localStorage.getItem('productData')) || null;
	  const now = Math.round(new Date().getTime() / 1000);
	  if(!data || (now - data.timeStamp) >= 86400) {
		  fetchData({
			  Displayable: 1,
			  Buyable: 1,
			  ProductStatus: {
          $in: [1,4]
        },
			  BrandID: 'BLH'
		  }, (err, data) => {
			  if(err) {
				  console.log(err);
			  } else {
				  this.upsert(data);
			  }
		  });
	  } else {
		  this.upsert(data.products);
	  }
  }
	storageAvailable(type) {
		try {
			const storage = window[type],
					x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}
	upsert(data) {
		// insert data into db as one big dump - Always use upsert for both inserts and modifies
		this.db.products.upsert(data, () => {
			console.log('data upserted');
			this.setState({productsLoaded: true});
			this.localStorageSupported && localStorage.setItem('productData', JSON.stringify({
				timeStamp: Math.round(new Date().getTime() / 1000),
				products: data
			}));
		});
	}
  static childContextTypes = {
    inApp: React.PropTypes.bool
  };

  getChildContext() {
    return {
      inApp: true
    };
  }
  render() {
    return (
      <div>
        <Header />
        <div className="main_content">
          {this.state.productsLoaded && React.Children.map(this.props.children, (child) => React.cloneElement(child, { db: this.db }))}
        </div>
        <Footer />
      </div>
    )
  }
}