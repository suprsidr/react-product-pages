import React, {Component} from 'react';
import {Product} from './Product';

export default class Products extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
	    filters: {},
	    baseQuery: {}, // the query you arrived on this page with
	    currentFilterQuery: {} // the query we build from filters
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
	  this.selectedFilters = {};
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
	handleFilterChange(e) {
		e.preventDefault();
		let query = {};
		query['$and'] = Array.from(this.refs.filters.querySelectorAll('select')).reduce((prev, next) => {
			let parts = next.value.split(':');
			if(parts[1]) {
				this.selectedFilters[parts[0]] = parts[1];
				let obj = {
					Attributes: {
						$elemMatch: {
							ID: parts[0],
							Name: parts[1]
						}
					}
				};
				prev.push(obj);
			} else {
				delete this.selectedFilters[parts[0]];
			}
			return prev;
		}, []);
		// add our base query
		query['$and'].unshift(this.state.baseQuery);
		this.setState({currentFilterQuery: query}, () => this.query(query, {
			limit: 0,
			sort: {
				DemandRank: 1
			},
			fields: this.fields
		}));
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
	  let query = {
		  Categories: {
			  $elemMatch: {
				  ID: {
					  $regex: regex
				  }
			  }
		  }
	  };
	  this.setState({baseQuery: query}, () => this.query(query, {
		  limit: 0,
		  sort: {
			  DemandRank: 1
		  },
		  fields: this.fields
	  }));

  }
  query(q, p) {
    this.props.db.products.find(q, p).fetch((data) => {
      this.setState({products: data}, () => this.getFilters());
    });
  }
	getFilters() {
		const filters = this.state.products.reduce((obj, product) => {
			return product.Attributes.reduce((prev, next) => {
				if(!next.ID.includes('ZZ_') && (next.ID.includes('facet_') || next.ID.includes('Completion_Level'))) {
					let key = next.ID;
					if(typeof prev[key] === 'undefined') {
						prev[key] = [];
					}
					prev[key].push(next.Name);
				}
				return prev;
			}, obj);
		}, {});
		this.setState({filters: filters});
	}
  render() {
    return (
	    <div className="row">
		    <div className="small-12 columns">
			    <h3 className="prodPageTitle">{this.props.params.category || `All Products`}</h3>
			    <div ref="filters" className="row small-up-2 medium-up-3 large-up-4 callout secondary">
				    {Object.keys(this.state.filters).sort((a, b) => a.replace(/(^spec_|facet_)/gi, '') > b.replace(/(^spec_|facet_)/gi, '')).map(key => {
					    return (
						    <div className="column">
							    <strong>{key.replace(/(^spec_|facet_)/gi, '').replace(/_/g, ' ')}</strong>
							    <select onChange={(e) => this.handleFilterChange(e)}>
								    <option value={key} selected={!this.selectedFilters[key] ? 'selected': ''}>Please Select</option>
								    {this.state.filters[key]
										    .reduce((prev, next) => {
											    if(prev.indexOf(next) === -1) {
												    prev.push(next);
											    }
											    return prev;
										    }, [])
										    .sort((a, b) => a > b)
										    .map((filter, i) => <option key={i} value={key +':'+ filter} selected={this.selectedFilters[key] === filter ? 'selected': ''}>{filter}</option>)}
							    </select>
						    </div>
					    )
				    })}
			    </div>
			    <div className="row small-up-2 medium-up-3 large-up-4">
				    {this.state.products.map((product) => <Product key={product.ProdID} product={product} db={this.props.db} />)}
			    </div>
		    </div>
	    </div>
    )
  }
}