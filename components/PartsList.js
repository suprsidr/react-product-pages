import React, {Component} from 'react';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import {Product} from './Product';

export default class PartsList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			products: []
		};
		this.partsList = [];
	}
	componentDidMount() {
		this.partsList = this.props.partsList.slice();
		this.makeQuery(this.partsList);
	}
	makeQuery(list) {
		this.query({
			ProdID: {
				$in: list
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
				_id: -1
			}
		});
	}
	query(q, p) {
		this.props.db.products.find(q, p).fetch((data) => {
			// set what we do have
			this.setState({products: data});
			// check for off brand items that are missing and add when returned
			let ids = data.map((product) => product.ProdID);
			const missing = this.partsList.filter((item) => ids.indexOf(item) === -1);
			if(missing.length > 0) {
				this.fetchData(missing, (err, res) => {
					if(err) {
						console.log('Fetch data error: ', err, 'PartsList::query');
					} else {
						this.setState({products: data.concat(res)});
					}
				});
			}
		});
	}
	fetchData(list, cb) {
		const q = JSON.stringify({
					Displayable: 1,
					Buyable: 1,
					ProdID: {
						$in: list
					}
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
			<div className="row small-up-2 medium-up-4 large-up-6">
				{this.state.products.map((product) => <Product key={product.ProdID} product={product} />)}
			</div>
		)
	}
}