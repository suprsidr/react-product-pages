import React, {Component} from 'react';

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
	handleClick(e, idx) {
		e.preventDefault();
		document.querySelector('.hero').src = `http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a${idx}?wid=500&hei=500`;
	}
	getMedia(idx = 1) {
		let img = document.createElement('img');
		let src = `http://s7d5.scene7.com/is/image/horizonhobby/${this.props.product.ProdID}_a${idx}?wid=100&hei=100`;
		img.addEventListener('load', (e) => {
			let media = this.state.mediaArray.slice();
			media.push({src: src, idx: idx});
			this.setState({mediaArray: media});
			idx++;
			this.getMedia(idx);
		}, false);
		img.src = src;
	}
	calculateStyles() {
		return {
			width: this.state.mediaArray.length * 110
		}
	}
	render() {
		return (
				<div ref="thumbSlider" className="row thumbSlider">
					<div className="small-12" style={this.calculateStyles()}>
						{(this.state.mediaArray.length > 0) && this.state.mediaArray.map((item, i) => {
							return (
								<a
										key={i}
										style={{display: 'inline-block'}}
										href={`#${this.props.product.ProdID}_a${item.idx}`}
										onClick={(e) => this.handleClick(e, item.idx)}
								>
									<img src={item.src}/>
								</a>
							)
						})}
					</div>
				</div>
		)
	}
}