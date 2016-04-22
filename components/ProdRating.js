import React, {Component} from 'react';


export default class ProdRating extends Component {
  calculateRating() {
    return this.props.rating ? (parseFloat(this.props.rating) * 2) * 10 + '%' : 0
  }
  render() {
    return (
      <span>
        <span className="reviewsRating"><span style={{width: this.calculateRating()}} className="stars"></span></span>
        <span className="reviewsLinks"><a className="numReviews" href="#">{`(${this.props.count} reviews)`}</a> <a className="writeReviews" href="#">Write a review</a></span>
      </span>
    )
  }
}


