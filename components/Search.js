import React, {Component} from 'react';
import {Product} from './Product';


export default class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentWillMount() {
    //this.setState({category: this.props.params.category.toLowerCase()});
  }
  componentDidMount() {
    const searchTerm = this.props.params.searchterm || 'all';
    this.makeQuery(searchTerm);
  }
  componentWillReceiveProps(nextProps) {
    const searchTerm = nextProps.params.searchterm || 'all';
    this.makeQuery(searchTerm);
  }
  makeQuery(category) {
    let regex;
    switch(category.toLowerCase()) {
      case 'multirotor':
        regex = /^MULTI_(RTF|BNF)/
        break;
      case 'helicopters':
        regex = /^HELI_(RTF|BNF)/
        break;
      default:
        /^._(RTF|BNF)$/
    }
    this.query({
      Categories: {
        $elemMatch: {
          ID: {
            $regex: regex
          }
        }
      }
    }, {
      limit: 0,
      sort: {
        ProdID: 1
      },
      fields: {
        ProdID: 1,
        BrandName: 1,
        Name: 1,
        Price: 1,
        Attributes: 1,
        Categories: 1,
        _id: -1
      }
    });
  }
  query(q, p) {
    this.props.db.products.find(q, p).fetch((data) => {
      this.setState({products: data});
    });
  }
  render() {
    return (
      <div className="row small-up-1 medium-up-2 large-up-4">
        {this.state.products.map((product) => <Product key={product.ProdID} product={product} />)}
      </div>
    )
  }
}