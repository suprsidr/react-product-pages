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

export default class ProdPageProduct extends Component {
  render() {
    return (
      <div className="small-12">
        <div className="row">
          <div className="small-12 medium-6 large-8 columns">
            <p><strong>{this.props.product.Name.replace(/&reg;/g, '')}</strong>{`(${this.props.product.ProdID})`}</p>
            <p><ProdRating rating={this.props.product.RatingAverage} count={this.props.product.RatingCount} /></p>
            <p><img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=600`} className="hero" alt={this.props.product.Name.replace(/&reg;/g, '')} /></p>
          </div>
          <div className="small-12 medium-6 large-4 columns">
            price column
          </div>
        </div>

      </div>
    )
  }
}