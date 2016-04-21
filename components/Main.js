import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import minimongo from 'minimongo';



export default class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prodId: ''
    };
    this.LocalDb = minimongo.MemoryDb;

    // Create local db (in memory database with no backing)
    this.db = new this.LocalDb();
  }
  componentWillMount() {
    // setup minimongo collection
    this.db.addCollection('products');
  }
  componentDidMount() {
    const q = JSON.stringify({
        Displayable: 1,
        Buyable: 1,
        BrandID: 'BLH'
      }),
      s = JSON.stringify({
        ProdID: 1
      }),
      f = JSON.stringify({
        _id: 0,
        ProdID: 1,
        BrandName: 1,
        Name: 1,
        Desc: 1,
        LongDesc: 1,
        Price: 1,
        ListPrice: 1,
        PartsList: 1,
        RatingAverage: 1,
        RatingCount: 1,
        Attributes: 1,
        Categories: 1
      });
    request
      .get(`http://159.203.116.76/search/${q}/0/${s}/${f}`)
      .use(jsonp)
      .end((err, res) => {
        err ? console.log(err) : '';
        //console.log(res.body);
        this.upsert(res.body);
      });

  }
  upsert(data) {
    // insert data into db as one big dump - Always use upsert for both inserts and modifies
    this.db.products.upsert(data, function () {
      console.log('data upserted');
    });
  }
  render() {
    return (
      <div>
        <div className="top-bar" role="nav">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">POC Product Pages</li>
              <li><IndexLink to="/">Home</IndexLink></li>
              <li><Link to="/products" activeStyle={{ color: '#00d8ff' }}>Products</Link></li>
              <li><Link to="/search" activeStyle={{ color: '#00d8ff' }}>Search</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
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
        <div className="main_content">
          {React.Children.map(this.props.children, (child) => React.cloneElement(child, { db: this.db }))}
        </div>
        <footer className="row">
          <div className="small-6 columns">
            © 2016 Wayne Patterson
          </div>
          <div className="small-6 columns text-right">
            Fork me on <a href="https://github.com/suprsidr/react-product-pages">Github</a>
          </div>
        </footer>
      </div>
    )
  }
}