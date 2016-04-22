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
              <p><s>Retail Price: ${this.props.product.ListPrice}</s><br />Selling Price: ${this.props.product.Price}</p>
              <p>&nbsp;</p>
              <ProdRating rating={this.props.product.RatingAverage} count={this.props.product.RatingCount} prodid={this.props.product.ProdID} />
            </div>
            <div className="action">
              <a className="button secondary" href="/retailer">Find A Retailer</a>&nbsp;<a className="button" href={`http://www.horizonhobby.com/webapp/wcs/stores/servlet/OrderItemAdd?catalogId=10051&langId=-1&storeId=10151&partNumber_1=${this.props.product.ProdID}&quantity_1=1&URL=AjaxOrderItemDisplayView`}>Buy Now</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


