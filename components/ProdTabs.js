import React, {Component} from 'react';
import PartsList from './PartsList';
import CompletionGuides from './CompletionGuides';

export default class ProdTabs extends Component {
	componentDidMount() {
		// click first tab
		let tab = document.querySelector('#product-tabs a');
		tab && tab.click();
	}
  onTabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.classList.contains('is-active')) return;
    let sib = e.target.parentNode.parentNode.querySelector('.is-active');
	  if(sib) {
		  sib.classList.remove('is-active');
		  sib.setAttribute('aria-selected', false);
	  }
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
	processVideos(html) {
		// I had this as two separate methods. But then I would be doing the following twice.
		let el = document.createElement('div');
		el.innerHTML = html;
		Array.from(el.querySelectorAll('embed[src*="youtube.com/"]')).forEach((embed) => {
			// argh! old youtube http://www.youtube.com/v/5sNS220gCjA?version=3&hl=en_US&rel=0
			if(embed.src.match(/(?:youtube\.com\/v\/)([^?&\s]+)/ig)) {
				let id = embed.src.split('/v/')[1].split('?')[0];
				let parent = embed.parentNode;
				let iframe = document.createElement('iframe');
				iframe.src = `https://www.youtube.com/embed/${id}?rel=0&amp;wmode=opaque`;
				iframe.setAttribute('frameborder', 0);
				iframe.setAttribute('allowfullscreen', 'allowfullscreen');
				let div = document.createElement('div');
				div.classList.add('flex-video');
				div.classList.add('widescreen');
				div.appendChild(iframe);
				parent.replaceChild(div, embed);
			}
		});
		Array.from(el.querySelectorAll('iframe[src*="youtube"]')).forEach((iframe) => {
			let div = document.createElement('div');
			let parent = iframe.parentNode;
      iframe.src = iframe.src.replace('http:', 'https:');
			// TODO make sure iframe is not already wrapped by div.flex-video.widescreen
			let dup = iframe.cloneNode(false);
			/* can we chain these? http://stackoverflow.com/questions/28653761/chaining-html5-classlist-api-without-jquery */
			div.classList.add('flex-video');
			div.classList.add('widescreen');
			div.appendChild(dup);
			parent.replaceChild(div, iframe);
		});
		Array.from(el.querySelectorAll('.yt-video-container')).forEach((container) => {
			let iframe = document.createElement('iframe');
			iframe.src = `https://www.youtube.com/embed/${container.dataset.ytid}?rel=0&amp;wmode=opaque`;
			iframe.setAttribute('frameborder', 0);
			iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			container.classList.add('flex-video');
			container.classList.add('widescreen');
			container.appendChild(iframe);
		});
		return el.innerHTML;
	}
  createMarkup(html) {
		html = this.processVideos(html);
		return {__html: html};
	}
  render() {
	  const regex = new RegExp('P_' + this.props.product.ProdID);
	  let manuals = this.props.product.Attributes.reduce((prev, next) => {
		  if(next.ID === 'Manual') {
			  prev = Array.isArray(next.Name) ? next.Name : [next.Name];
		  }
		  return prev;
	  }, []);
    let specs = this.props.product.Attributes.reduce((prev, next) => {
      if(next.ID.match(/^spec_/i)) {
	      const name = Array.isArray(next.Name) ? next.Name.join(', ') : next.Name;
        prev.push({ID: next.ID.replace(/(^spec_|facet_)/gi, '').replace(/_/g, ' '), Name: name.replace(regex, '')});
      }
      return prev;
    }, []).sort((a, b) => a.ID > b.ID);

	  if(this.props.product.LongDesc || specs.length > 0 || this.props.product.PartsList || this.props.product.CompletionGuides || manuals.length > 0) {
		  return (
				  <div className="row">
					  <div className="small-12 columns">
						  <ul className="tabs" data-tabs id="product-tabs">
							  {this.props.product.LongDesc &&
							  <li className="tabs-title"><a className="is-active" href="#overview" onClick={(e) => this.onTabClick(e)}
							                                aria-selected="true">Overview</a></li>}
                {(specs.length > 0) &&
                <li className="tabs-title"><a href="#specs" onClick={(e) => this.onTabClick(e)}>Specs</a></li>}
							  {this.props.product.PartsList &&
							  <li className="tabs-title"><a href="#parts" onClick={(e) => this.onTabClick(e)}>Parts &amp;
								  Accessories</a></li>}
                {this.props.product.CompletionGuides &&
                <li className="tabs-title"><a href="#completion" onClick={(e) => this.onTabClick(e)}>Completion Guides</a></li>}
							  {(manuals.length > 0) &&
							  <li className="tabs-title"><a href="#manuals" onClick={(e) => this.onTabClick(e)}>Manuals &amp;
								  Support</a></li>}
						  </ul>
					  </div>
					  <div className="small-12 columns">
						  <div className="tabs-content" ref="tabContent" data-tabs-content="product-tabs">
							  {this.props.product.LongDesc && <div className="tabs-panel is-active" id="overview"
							                                       dangerouslySetInnerHTML={this.createMarkup(this.props.product.LongDesc)}></div>}
                <div className="tabs-panel" id="specs">
                  {(specs.length > 0) && <table>
                    <tbody>
                    {specs.map((spec, i) => (
                        <tr key={i}>
                          <td>{spec.ID}</td>
                          <td>{spec.Name}</td>
                        </tr>
                      )
                    )}
                    </tbody>
                  </table>}
                </div>
							  <div className="tabs-panel" id="parts">
								  {this.props.product.PartsList &&
								  <PartsList partsList={this.props.product.PartsList} db={this.props.db}/>}
							  </div>
                <div className="tabs-panel" id="completion">
                  {this.props.product.CompletionGuides &&
                  <CompletionGuides list={this.props.product.CompletionGuides} db={this.props.db}/>}
                </div>
							  <div className="tabs-panel" id="manuals">
								  {(manuals.length > 0) && <ul>
									  {manuals.map((manual, i) => <li key={i}><a href={`http://www.horizonhobby.com/pdf/${manual}`}>{manual}</a>
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


