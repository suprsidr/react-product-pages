import React, {Component} from 'react';
import { Link } from 'react-router';
import ProdPriceBox from './ProdPriceBox';
import ProdTabs from './ProdTabs';
import ProdMedia from './ProdMedia';
import StaticContent from './StaticContent';
import {SCENE7_URL} from '../config/globals';

export class Product extends Component {
	errorHandler(e, wid) {
		e.target.error = null;
		e.target.src = `${SCENE7_URL}/no_image?wid=${wid}`
	}
  render() {
    return (
      <div className="column text-center">
        <p className={`prodThumb${this.props.product.ProductStatus === 2 ? ' disc' : ''}${this.props.product.ProductStatus === 4 ? ' new' : ''}`}>
          <Link to={`/product/${this.props.product.ProdID}`}>
            <img src={`${SCENE7_URL}/${this.props.product.ProdID}_a0?wid=300&hei=300`} onError={(e) => this.errorHandler(e, 300)} className="thumbnail" alt="" />
          </Link>
        </p>
        <p><strong>{`${this.props.product.Name.replace(/&reg;/g, '®')} (${this.props.product.ProdID})`}</strong><br />{(this.props.product.ProductStatus !== 2) && `$${this.props.product.Price}`}</p>
      </div>
    )
  }
}

export class ProdPageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childLoaded: false,
      mediaSize: 500
    };
  }
  errorHandler(e, wid) {
    e.target.error = null;
    e.target.src = `${SCENE7_URL}/no_image?wid=${wid}`
  }
  componentDidMount() {
    this.setState({mediaSize: this.getMediaSize()});
  }
  getMediaSize() {
    return window.innerWidth < 500 ? window.innerWidth : 500;
  }
  updateFromChild(obj) {
    this.setState(obj);
  }
  render() {
    return (
      <div className="small-12 columns">
        <StaticContent product={this.props.product} updateParent={(obj) => this.updateFromChild(obj)} />
        {!this.state.childLoaded && <div className="row">
          <div className="small-12 columns prodTitle">
            <h3>{this.props.product.Name.replace(/&reg;/g, '®').replace(/&trade;/g, '™')}</h3><strong>{`(${this.props.product.ProdID})`}</strong>
          </div>
          <div className="small-12 medium-7 large-8 columns text-center">
            <p>
              <img
                src={`${SCENE7_URL}/${this.props.product.ProdID}_a0?wid=${this.state.mediaSize}&hei=${this.state.mediaSize}`}
                onError={(e) => this.errorHandler(e, this.state.mediaSize)}
                className="hero" alt={this.props.product.Name.replace(/&reg;/g, '')} />
            </p>
	          <div className="row">
		          <div className="small-12 columns">
			          <ProdMedia mediaSize={this.state.mediaSize} product={this.props.product} />
		          </div>
	          </div>
          </div>
          <div className="small-12 medium-5 large-4 columns text-center">
            <ProdPriceBox product={this.props.product} />
          </div>
        </div>}

        <ProdTabs product={this.props.product} db={this.props.db} />
      </div>
    )
  }
}
