import React, {Component} from 'react';
import {Product} from './Product';
import {fetchData, upsert} from '../config/utils';


export default class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      showMessage: false,
	    showMessageLink: false,
	    status: [1,4],
	    searchTerm: ''
    };
  }
  componentDidMount() {
	  this.setState({searchTerm: this.props.params.searchTerm || ''}, () => {
		  this.makeQuery(this.state.searchTerm);
  });
  }
  componentWillReceiveProps(nextProps) {
	  this.setState({searchTerm: nextProps.params.searchTerm || '', products: [], showMessage: false}, () => {
		  this.makeQuery(this.state.searchTerm);
	  });
  }
	handleDiscClick(e) {
    e.preventDefault();
		this.setState({status: [2], showMessage: false}, () => {
			this.makeQuery(this.state.searchTerm)
		});
  }
  makeQuery(searchTerm) {
	  console.log(searchTerm);
	  let q = {
		  Categories: {
			  $elemMatch: {
				  ID: {
					  $regex: /[A-Z]+_(RTF|BNF)$/
				  }
			  }
		  },
      ProductStatus: {
        $in: this.state.status
      }
	  };
	  if(searchTerm !== '') {
		  q = this.getQuery(new RegExp(searchTerm, 'gi'));
	  }
	  console.log(q);
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
        ProductStatus: 1,
        _id: -1
      }
    });
  }

	/**
	 * We have to use two different Regexp. One for miniMongo and one for remote queries
	 * local: new RegExp(searchTerm, 'gi')
	 * remote: we send an array [searchTerm, modifiers] eg. [this.searchTerm, 'gi']
	 * remote server translates the array to: new RegExp(array[0][, array[1]])
	 * @param regex
	 * @returns {Object} query paramaters
	 */
	getQuery(regex) {
		return  {
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
			],
			ProductStatus: {
        $in: this.state.status
      }
		};
	}
  query(q, p) {
    this.props.db.products.find(q, p).fetch((data) => {
	    if(data.length === 0 && this.state.status.indexOf(1) > -1) {
        this.setState({showMessage: true, showMessageLink: true});
	    } else if(data.length === 0 && this.state.status.indexOf(2) > -1) {
		    fetchData(this.getQuery([this.state.searchTerm, 'gi']), (err, res) => {
			    if(err) {
				    console.log('Fetch data error: ', err, 'Search::query');
				    this.setState({showMessage: true, showMessageLink: false});
			    } else {
				    if(res.length === 0) {
					    this.setState({showMessage: true, showMessageLink: false});
				    } else {
					    upsert(this.props.db, res);
					    this.setState({products: res, status: [1,4], showMessage: false});
				    }
			    }
		    });
	    } else {
		    this.setState({products: data});
	    }
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
              <div className="small-12 columns">
                <p>{`Sorry, no results for "${this.state.searchTerm}".`} {this.state.showMessageLink && <a href={this.state.searchTerm} onClick={(e) => this.handleDiscClick(e)}>{`Try searching in Discontinued items.`}</a>}</p>
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