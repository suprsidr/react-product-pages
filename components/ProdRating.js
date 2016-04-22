import React, {Component} from 'react';


export default class ProdRating extends Component {
  calculateRating() {
    return this.props.rating ? (parseFloat(this.props.rating) * 2) * 10 + '%' : 0
  }
  render() {
    return (
      <p className="prodRating">
        <span className="reviewsRating"><span style={{width: this.calculateRating()}} className="stars"></span></span><br />
        <span className="reviewsLinks">{this.props.count && <a className="numReviews" href={`http://www.horizonhobby.com/products/${this.props.prodid}#reviews`}>({this.props.count} reviews)</a>}
          <a className="writeReviews" href={`http://www.horizonhobby.com/products/${this.props.prodid}#reviews`}>Write a review</a></span>
      </p>
    )
  }
}


