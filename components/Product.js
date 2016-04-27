import React, {Component} from 'react';
import { Link } from 'react-router';
import ProdPriceBox from './ProdPriceBox';
import ProdTabs from './ProdTabs';
import ProdMedia from './ProdMedia';

export class Product extends Component {
	errorHandler(e, wid) {
		e.target.error = null;
		e.target.src = `http://s7d5.scene7.com/is/image/horizonhobby/no_image?wid=${wid}`
	}
  render() {
    return (
      <div className="column text-center">
        <p className="prodThumb">
          <Link to={`/product/${this.props.product.ProdID}`}>
            <img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=300&hei=300`} onError={(e) => this.errorHandler(e, 300)} className="thumbnail" alt="" />
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
            <h3>{this.props.product.Name.replace(/&reg;/g, '')}</h3><strong>{`(${this.props.product.ProdID})`}</strong>
          </div>
          <div className="small-12 medium-7 large-8 columns text-center">
            <p><img src={`http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a0?wid=500`} onError={(e) => this.errorHandler(e, 500)} className="hero" alt={this.props.product.Name.replace(/&reg;/g, '')} /></p>
	          <div className="row">
		          <div className="small-12 columns">
			          <ProdMedia product={this.props.product} />
		          </div>
	          </div>
          </div>
          <div className="small-12 medium-5 large-4 columns text-center">
            <ProdPriceBox product={this.props.product} />
          </div>
        </div>
        <ProdTabs product={this.props.product} db={this.props.db} />
      </div>
    )
  }
}