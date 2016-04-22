import React, {Component} from 'react';


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
    return {__html: html};
  }
  render() {
    return (
      <div className="row">
        <div className="small-12 columns">
          <ul className="tabs" data-tabs id="product-tabs">
            <li className="tabs-title"><a className="is-active" href="#overview" onClick={(e) => this.onTabClick(e)} aria-selected="true">Overview</a></li>
            <li className="tabs-title"><a href="#parts" onClick={(e) => this.onTabClick(e)}>Parts &amp; Accessories</a></li>
            <li className="tabs-title"><a href="#manuals" onClick={(e) => this.onTabClick(e)}>Manuals &amp; Support</a></li>
          </ul>
        </div>
        <div className="small-12 columns">
          <div className="tabs-content" ref="tabContent" data-tabs-content="product-tabs">
            <div className="tabs-panel is-active" id="overview" dangerouslySetInnerHTML={this.createMarkup(this.props.product.LongDesc)}>
            </div>
            <div className="tabs-panel" id="parts">
              PartList
            </div>
            <div className="tabs-panel" id="manuals">
              Manuals
            </div>
          </div>
        </div>
      </div>
    )
  }
}


