import React, {Component} from 'react';
import {SCENE7_URL} from '../config/globals';

export default class ProdMedia extends Component {
	constructor (props) {
		super(props);
		this.state = {
			mediaArray: []
		};
	}
	componentDidMount() {
		this.getMedia();
	}
  componentWillUnmount() {
    this.interval && window.clearInterval(this.interval);
  }
	handleClick(e, idx) {
		e.preventDefault();
		document.querySelector('.hero').src = `${SCENE7_URL}/${this.props.product.ProdID}_a${idx}?wid=${this.props.mediaSize}&hei=${this.props.mediaSize}`;
	}
	getMedia(idx = 1) {
		let img = document.createElement('img');
		let src = `${SCENE7_URL}/${this.props.product.ProdID}_a${idx}?wid=120&hei=120`;
		img.addEventListener('load', (e) => {
			let media = this.state.mediaArray.slice();
			media.push({src: src, idx: idx});
			this.setState({mediaArray: media});
			idx++;
			this.getMedia(idx);
		}, false);
		// our error denotes the last image has loaded, lets start our slideshow
		img.addEventListener('error', (e) => {
			if(this.state.mediaArray.length > 0) {
				this.interval = window.setInterval(() => {
					let media = this.state.mediaArray.slice();
					let el = media.pop();
					media.unshift(el);
					this.setState({mediaArray: media}, () => document.querySelector('.thumbSlider a').click());
				}, 6000);
			}
		}, false);
		img.src = src;
	}
	/*calculateStyles() {
		return {
			width: this.state.mediaArray.length * 106.6666666666667
		}
	}*/
	getThumbStyle() {
		return {
			width: parseInt(window.getComputedStyle(document.querySelector('.thumbSlider')).width.replace('px', '')) / 6
		}
	}
	render() {
		return (
				<div className="thumbSlider">
					<div style={{width: '3000%'}}>
						{(this.state.mediaArray.length > 0) && this.state.mediaArray.map((item, i) => {
							return (
								<a
                  key={i}
                  style={{display: 'inline-block'}}
                  href={`#${this.props.product.ProdID}_a${item.idx}`}
                  onClick={(e) => this.handleClick(e, item.idx)}
                  style={this.getThumbStyle()}>
									<img src={item.src}/>
								</a>
							)
						})}
					</div>
				</div>
		)
	}
}
