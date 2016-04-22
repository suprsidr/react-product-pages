import React, {Component} from 'react';
import ProdPageProduct from './ProdPageProduct';


export default class ProdPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    this.query({
      ProdID: this.props.params.id
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
      this.setState({products: data});
    });
  }
  render() {
    return (
      <div className="row">
        {this.state.products.map((product) => <ProdPageProduct key={product.ProdID} product={product} />)}
      </div>
    )
  }
}