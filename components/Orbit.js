import React, {Component} from 'react';

class Orbit extends Component {
	constructor (props) {
		super(props);
		this.state = {
			slides: []
		};
	}
	componentWillMount() {
		this.setState({slides: this.props.slides.map((slide, i) => {
			// set our first slide to active
			slide.index = i;
			slide.active = i === 0;
			slide.style = i === 0 ? {display: 'block'} : {display: 'none'}
			slide.classes = 'orbit-slide';
			return slide;
		})});
	}
	componentDidMount() {
		/*window.setInterval(() => {
			let nextSlide = false;
			let slides = this.state.slides.slice().map((slide) => {
				if(nextSlide === true) {
					nextSlide = false;
					slide.active = true;
					slide.classes = 'orbit-slide slide-in-right mui-enter mui-enter-active';
					slide.style = {display: 'block'};
					return slide;
				}
				if(slide.active) {
					slide.active = false;
					slide.classes = 'orbit-slide slide-out-left mui-leave mui-leave-active';
					slide.style = {display: 'block'};
					nextSlide = true;
				} else {
					slide.classes = 'orbit-slide';
					slide.style = {display: 'none'};
				}
				return slide;
			});
			this.setState({slides: slides});
		}, 6000)*/
	}
	getWasActive(slide, side='left') {
		return Object.assign(slide, {
			active: false,
			classes: `orbit-slide slide-out-${side}`,
			style: {display: 'block'}
		});
	}
	getNewActive(slide, side='right') {
		return Object.assign(slide, {
			active: true,
			classes: `orbit-slide active slide-in-${side}`,
			style: {display: 'block'}
		});
	}
	handleBulletClick(e) {
		e.preventDefault();
		let slides = this.state.slides.slice();
		var active = this.getActive().index;
		let newActive = parseInt(e.target.dataset.slide);
    if(newActive === active) {
      return;
    }
		// reset slides
		slides.map((slide) => {
			return Object.assign(slide, {
				active: false,
				classes: 'orbit-slide',
				style: {display: 'none'}
			});
		});
    if(newActive < active) {
      slides[active] = this.getWasActive(slides[active], 'right');
      slides[newActive] = this.getNewActive(slides[newActive], 'left');
    } else {
      slides[active] = this.getWasActive(slides[active]);
      slides[newActive] = this.getNewActive(slides[newActive]);
    }

		this.setState({slides: slides});
	}
	getActive() {
		return this.state.slides.reduce((cur, next) => {
			if(next.active) {
				cur = next;
			}
			return cur;
		}, {});
	}
	render() {
		const slide1 = this.state.slides[0];
		return (
				<div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
					<ul className="orbit-container">
						<button className="orbit-previous"><span className="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
						<button className="orbit-next"><span className="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
						<img className="orbit-image" src={this.props.imgbase + slide1.img} alt={slide1.title} style={{visibility: 'hidden'}}/>
						{this.state.slides.map((slide) => {
							return (
									<li key={slide.index} className={slide.classes} style={slide.style}>
										<a href={this.props.linkbase + slide.url}>
											<img className="orbit-image" src={this.props.imgbase + slide.img} alt={slide.title} />
										</a>
										<figcaption className="orbit-caption">{slide.title}</figcaption>
									</li>
							)
						})}
					</ul>
					<nav className="orbit-bullets">
						{this.state.slides.map((slide) => {
							return (
									<button className={slide.active ? 'is-active' : ''} key={slide.index} data-slide={slide.index} onClick={(e) => this.handleBulletClick(e)}><span className="show-for-sr">{slide.title}</span></button>
							)
						})}
					</nav>
				</div>
		)
	}
}

export default Orbit;
