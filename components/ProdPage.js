import React, {Component} from 'react';
import {ProdPageProduct} from './Product';
import request from 'superagent';
import jsonp from 'superagent-jsonp';


export default class ProdPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: []
    };
  }
	componentWillReceiveProps(nextProps) {
		this.makeQuery(nextProps.params.id);
	}
  componentDidMount() {
    this.makeQuery(this.props.params.id);
	  (document.body ||
	  document.body.parentNode ||
	  document.documentElement).scrollTop = 0;
  }
	makeQuery(id) {
		this.query({
			ProdID: id
		}, {
			limit: 0,
			sort: {
				ProdID: 1
			},
			fields: {
				_id: -1
			}
		});
	}
  query(q, p) {
    this.props.db.products.find(q, p).fetch((data) => {
	    if(data.length === 0) {
		    this.fetchData(this.props.params.id, (err, res) => {
			    if(err) {
				    console.log('Fetch data error: ', err, 'PartsList::query');
			    } else {
				    this.setState({products: res});
			    }
		    });
	    } else {
		    this.setState({products: data});
	    }
    });
  }
	fetchData(id, cb) {
		const q = JSON.stringify({
					Displayable: 1,
					Buyable: 1,
					ProdID: id
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
					if(res.body.error) {
						cb(res.body.error)
					} else {
						cb(null, res.body);
					}
				});
	}
	upsert(data) {
		this.props.db.products.upsert(data, () => {
			console.log('data upserted');
		});
	}
  render() {
    return (
      <div className="row">
        {this.state.products.map((product) => <ProdPageProduct key={product.ProdID} product={product} db={this.props.db} />)}
      </div>
    )
  }
}