import React, {Component} from 'react';
import PartsList from './PartsList';

export default class ProdTabs extends Component {
  onTabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.classList.contains('is-active')) return;
    let sib = e.target.parentNode.parentNode.querySelector('.is-active');
    sib.classList.remove('is-active');
    sib.setAttribute('aria-selected', false);
    e.target.classList.add('is-active');
    e.target.setAttribute('aria-selected', true);
    let panels = Array.from(this.refs.tabContent.children);
    panels.forEach((panel) => {
      if(panel.id === e.target.getAttribute('href').replace('#', '')) {
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    });
  }
  createMarkup(html) {
		let el = document.createElement('div');
		el.innerHTML = html;
		Array.from(el.querySelectorAll('iframe[src*="youtube"]')).forEach((iframe) => {
			let div = document.createElement('div');
		  let parent = iframe.parentNode;
			// TODO make sure iframe is not already wrapped by div.flex-video.widescreen
		  let dup = iframe.cloneNode(false);
		  /* can we chain these? http://stackoverflow.com/questions/28653761/chaining-html5-classlist-api-without-jquery */
		  div.classList.add('flex-video');
		  div.classList.add('widescreen');
		  div.appendChild(dup);
		  parent.replaceChild(div, iframe);
	  });
		return {__html: el.innerHTML};
	}
  render() {
	  let manuals = this.props.product.Attributes.reduce((prev, next) => {
		  if(next.ID === 'Manual') {
			  prev = Array.isArray(next.Name) ? next.Name : [next.Name];
		  }
		  return prev;
	  }, []);
	  if(this.props.product.LongDesc || this.props.product.PartsList || manuals.length > 0) {
		  return (
				  <div className="row">
					  <div className="small-12 columns">
						  <ul className="tabs" data-tabs id="product-tabs">
							  {this.props.product.LongDesc &&
							  <li className="tabs-title"><a className="is-active" href="#overview" onClick={(e) => this.onTabClick(e)}
							                                aria-selected="true">Overview</a></li>}
							  {this.props.product.PartsList &&
							  <li className="tabs-title"><a href="#parts" onClick={(e) => this.onTabClick(e)}>Parts &amp;
								  Accessories</a></li>}
							  {(manuals.length > 0) &&
							  <li className="tabs-title"><a href="#manuals" onClick={(e) => this.onTabClick(e)}>Manuals &amp;
								  Support</a></li>}
						  </ul>
					  </div>
					  <div className="small-12 columns">
						  <div className="tabs-content" ref="tabContent" data-tabs-content="product-tabs">
							  {this.props.product.LongDesc && <div className="tabs-panel is-active" id="overview"
							                                       dangerouslySetInnerHTML={this.createMarkup(this.props.product.LongDesc)}></div>}
							  <div className="tabs-panel" id="parts">
								  {this.props.product.PartsList &&
								  <PartsList partsList={this.props.product.PartsList} db={this.props.db}/>}
							  </div>
							  <div className="tabs-panel" id="manuals">
								  {(manuals.length > 0) && <ul>
									  {manuals.map((manual) => <li><a href={`http://www.horizonhobby.com/pdf/${manual}`}>{manual}</a>
									  </li>)}
								  </ul>}
							  </div>
						  </div>
					  </div>
				  </div>
		  )
	  } else {
		  return null;
	  }
  }
}


