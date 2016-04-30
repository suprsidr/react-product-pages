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
	  this.refs.sorrymsg.style.display = 'none';
    const searchTerm = nextProps.params.searchterm || 'all';
    this.makeQuery(searchTerm);
  }
  makeQuery(searchTerm) {
	  console.log('making query');
	  let q = {
		  Categories: {
			  $elemMatch: {
				  ID: {
					  $regex: /[A-Z]+_(RTF|BNF)$/
				  }
			  }
		  }
	  };
	  if(searchTerm !== '') {
		  let regex = new RegExp(searchTerm, 'gi');
		  q = {
			  $or: [
				  {
					  Categories: {
						  $elemMatch: {
							  Name: {
								  $regex: regex
							  }
						  }
					  }
				  },
				  {
					  ProdID: {
						  $regex: regex
					  }
				  },
				  {
					  Desc: {
						  $regex: regex
					  }
				  },
				  {
					  LongDesc: {
						  $regex: regex
					  }
				  },
				  {
					  Keywords: {
						  $regex: regex
					  }
				  }
			  ]
		  };
	  }
    this.query(q, {
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
	    if(data.length < 1) {
		    this.refs.sorrymsg.style.display = 'block';
	    }
      this.setState({products: data});
    });
  }
  render() {
    return (
		    <div className="row">
			    <div className="small-12 columns">
				    <h3>Search Results:</h3>
				    <p ref="sorrymsg" style={{display: 'none'}}>Sorry, no results for {this.props.params.searchterm}.</p>
				    <div className="row small-up-2 medium-up-3 large-up-4">
					    {this.state.products.map((product) => <Product key={product.ProdID} product={product} />)}
				    </div>
			    </div>
		    </div>
    )
  }
}