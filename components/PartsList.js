import React, {Component} from 'react';
import {Product} from './Product';

export default class PartsList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		this.makeQuery(this.props.partsList);
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
	// TODO fetch missing parts
	query(q, p) {
		this.props.db.products.find(q, p).fetch((data) => {
			this.setState({products: data});
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