import React, {Component} from 'react';
import ProdRating from './ProdRating';


export default class ProdPriceBox extends Component {
  render() {
    return (
      <div className="row">
        <div className="small-12 columns text-center">
          <div className="card">
            <div className="top">
              <span className="message">Free Shipping on orders over 99*. <a href="/content/support-render-shipping">Learn More</a></span>
            </div>
            <div className="content">
	            {this.props.product.Desc && <p className="prodShortDesc">{this.props.product.Desc.replace(/&reg;/g, '®').replace(/&trade;/g, '™')}</p>}
	            {(this.props.product.ProductStatus === 2) && <p>This item is no longer available</p>}
	            {(this.props.product.ProductStatus !== 2) && <p><s>Retail Price: ${this.props.product.ListPrice}</s><br />Selling Price: ${this.props.product.Price}</p>}
              <p>&nbsp;</p>
              <ProdRating rating={this.props.product.RatingAverage} count={this.props.product.RatingCount} prodid={this.props.product.ProdID} />
            </div>
            <div className="action">
              <a className="button secondary" href="/storelocator">Find A Retailer</a>&nbsp;{(this.props.product.ProductStatus !== 2) && <a className="button" href={`http://www.horizonhobby.com/webapp/wcs/stores/servlet/OrderItemAdd?catalogId=10051&langId=-1&storeId=10151&partNumber_1=${this.props.product.ProdID}&quantity_1=1&URL=AjaxOrderItemDisplayView`}>{this.props.product.ProductStatus === 4 ? 'Pre-Order' : 'Buy Now'}</a>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


