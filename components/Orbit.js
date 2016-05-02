import React, {Component} from 'react';

class Orbit extends Component {
	constructor (props) {
		super(props);
		this.state = {
			slides: []
		};
    this.paused = false;
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
  pause(bool) {
    this.paused = bool;
  }
	componentDidMount() {
		window.setInterval(() => {
			if(!this.paused) {
        this.refs.next.click();
      }
		}, 5000)
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
		let active = this.getActive().index;
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
  nextClick(e) {
    e.preventDefault();
    let active = this.getActive().index;
    e.target.dataset.slide = active === this.state.slides.length - 1 ? 0 : active + 1;
    this.handleBulletClick(e);
  }
  previousClick(e) {
    e.preventDefault();
    let active = this.getActive().index;
    e.target.dataset.slide = active === 0 ? this.state.slides.length - 1 : active - 1;
    this.handleBulletClick(e)
  }
	render() {
		const slide1 = this.state.slides[0];
		return (
				<div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit onMouseEnter={(e) => this.pause(true)} onMouseLeave={(e) => this.pause(false)}>
					<ul className="orbit-container">
						<button ref="prev" className="orbit-previous" onClick={(e) => this.previousClick(e)}><span className="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
						<button ref="next" className="orbit-next" onClick={(e) => this.nextClick(e)}><span className="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
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
