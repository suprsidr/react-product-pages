import React, {Component} from 'react';
import {Product} from './Product';

export default class Products extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: []
    };
	  this.fields = {
		  ProdID: 1,
		  BrandName: 1,
		  Name: 1,
		  Price: 1,
		  Attributes: 1,
		  Categories: 1,
		  _id: -1
	  };
  }
  componentWillMount() {
    //this.setState({category: this.props.params.category.toLowerCase()});
  }
  componentDidMount() {
    this.makeQuery(this.props.params.category.toLowerCase());
  }
  componentWillReceiveProps(nextProps) {
    this.makeQuery(nextProps.params.category.toLowerCase());
  }
  makeQuery(category) {
    let regex;
    switch(category) {
      case 'multirotor':
        regex = /^MULTI_(RTF|BNF)/;
        break;
      case 'helicopters':
        regex = /^HELI_(RTF|BNF)/;
        break;
      default:
	      regex = /[A-Z]+_(RTF|BNF)$/;
	      break;
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
	      DemandRank: 1
      },
      fields: this.fields
    });
  }
  query(q, p) {
    this.props.db.products.find(q, p).fetch((data) => {
      this.setState({products: data}, () => this.getFilters());
    });
  }
	getFilters() {
		const filters = this.state.products.reduce((obj, product) => {
			return product.Attributes.reduce((prev, next) => {
				if(next.ID.includes('ZZ_')) return;
				if(next.ID.includes('facet_')) {
					let key = next.ID.replace(/(^spec_|facet_)/gi, '');
					try{
						prev[key].val.push(next.Name);
					} catch(e) {
						prev[key] = {};
						prev[key].val = [];
						prev[key].val.push(next.Name);
					}
				}
				return prev;
			}, obj);
		}, {});
		console.log(filters);
	}
  render() {
    return (
	    <div className="row">
		    <div className="small-12 columns">
			    <h3 className="prodPageTitle">{this.props.params.category || `All Products`}</h3>
			    <div className="row small-up-2 medium-up-3 large-up-4">
				    {this.state.products.map((product) => <Product key={product.ProdID} product={product} db={this.props.db} />)}
			    </div>
		    </div>
	    </div>
    )
  }
}