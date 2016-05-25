import React, {Component} from 'react';
import {ProdPageProduct} from './Product';
import {fetchData, upsert} from '../config/utils';

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
		    fetchData({
			    Displayable: 1,
			    Buyable: {
				    $in: [0,1]
			    },
			    ProductStatus: {
				    $in: [1,2,4]
			    },
			    ProdID: this.props.params.id
		    }, (err, res) => {
			    if(err) {
				    console.log('Fetch data error: ', err, 'PartsList::query');
			    } else {
				    upsert(this.props.db, res);
				    this.setState({products: res});
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
        {this.state.products.map((product) => <ProdPageProduct key={product.ProdID} product={product} db={this.props.db} />)}
      </div>
    )
  }
}