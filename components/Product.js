import React, {Component} from 'react';
import { Link } from 'react-router';
import ProdRating from './ProdRating';

export default class Product extends Component {
  render() {
    return (
      <div className="column text-center">
        <p>
          <Link to={`/product/${this.props.product.ProdID}`}>
            <img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=300&hei=300`} className="thumbnail" alt="" />
          </Link>
        </p>
        <p><strong>{this.props.product.Name.replace(/&reg;/g, '')}</strong><br />{this.props.product.Price}</p>
      </div>
    )
  }
}
