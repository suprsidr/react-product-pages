import React, {Component} from 'react';
import { Link } from 'react-router';
import ProdPriceBox from './ProdPriceBox';
import ProdTabs from './ProdTabs';

export class Product extends Component {
  render() {
    return (
      <div className="column text-center">
        <p>
          <Link to={`/product/${this.props.product.ProdID}`}>
            <img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=300&hei=300`} className="thumbnail" alt="" />
          </Link>
        </p>
        <p><strong>{this.props.product.Name.replace(/&reg;/g, '')}</strong><br />${this.props.product.Price}</p>
      </div>
    )
  }
}

export class ProdPageProduct extends Component {
  render() {
    return (
      <div className="small-12">
        <div className="row">
          <div className="small-12 columns prodTitle">
            <p><h3>{this.props.product.Name.replace(/&reg;/g, '')}</h3><strong>{`(${this.props.product.ProdID})`}</strong></p>
          </div>
          <div className="small-12 medium-7 large-8 columns">
            <p><img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=500`} className="hero" alt={this.props.product.Name.replace(/&reg;/g, '')} /></p>
          </div>
          <div className="small-12 medium-5 large-4 columns">
            <ProdPriceBox product={this.props.product} />
          </div>
        </div>
        <ProdTabs product={this.props.product} />
      </div>
    )
  }
}