import React, {Component} from 'react';
import {Product} from './Product';
import {fetchData, upsert} from '../config/utils';

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
			const ids = data.map((product) => product.ProdID);
			const missing = this.partsList.filter((item) => ids.indexOf(item) === -1);
			if(missing.length > 0) {
				fetchData({
					Displayable: 1,
					Buyable: {
            $in: [0, 1]
          },
					ProdID: {
						$in: missing
					},
          ProductStatus: {
            $in: [1, 2]
          }
				}, (err, res) => {
					if(err) {
						console.log('Fetch data error: ', err, 'PartsList::query');
					} else {
						upsert(this.props.db, res);
						this.setState({products: data.concat(res)});
					}
				});
			}
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