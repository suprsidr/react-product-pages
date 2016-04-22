import React, {Component} from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import minimongo from 'minimongo';
import Header from './Header';
import Footer from './Footer';



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
    this.db.products.upsert(data, () => {
      console.log('data upserted');
      this.setState({productsLoaded: true})
    });
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