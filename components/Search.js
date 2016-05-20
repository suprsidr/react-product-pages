import React, {Component} from 'react';
import {Product} from './Product';


export default class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      showMessage: false
    };
  }
  componentWillMount() {
    //this.setState({category: this.props.params.category.toLowerCase()});
  }
  componentDidMount() {
    this.status = [1];
    const searchTerm = this.props.params.searchterm || '';
    this.makeQuery(searchTerm);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({showMessage: false});
    const searchTerm = nextProps.params.searchterm || '';
    this.makeQuery(searchTerm);
  }
  handleDiscChange(e) {
    e.preventDefault();
    this.status = e.target.value;
  }
  makeQuery(searchTerm) {
	  let q = {
		  Categories: {
			  $elemMatch: {
				  ID: {
					  $regex: /[A-Z]+_(RTF|BNF)$/
				  }
			  }
		  },
      ProductStatus: {
        $in: this.status
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
					  Name: {
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
        this.setState({showMessage: true});
	    }
      this.setState({products: data});
    });
  }
  render() {
    return (
		    <div className="row">
			    <div className="small-12 columns">
            <div className="row">
              <div className="small-12 columns">
                <h3>Search Results:</h3>
              </div>
            </div>
            {this.state.showMessage && <div className="row">
              <div className="small-5 columns">
                <p>Sorry, no results for {this.props.params.searchterm}.</p>
              </div>
              <div className="small-7 columns">
                <label>Discontinued</label>:
                <select onchange={(e) => this.handleDiscChange(e)} class="no-custom">
                  <option value={[1]} selected>Exclude Discontinued</option>
                  <option value={[1, 2]}>Include Discontinued</option>
                  <option value={[2]}>Discontinued Only</option>
                </select>
              </div>
            </div>}
            <div className="row">
              <div className="small-12 columns">
                <div className="row small-up-2 medium-up-3 large-up-4">
                  {this.state.products.map((product) => <Product key={product.ProdID} product={product} />)}
                </div>
              </div>
            </div>
			    </div>
		    </div>
    )
  }
}