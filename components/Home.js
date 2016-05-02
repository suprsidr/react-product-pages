import React, {Component} from 'react';
import Orbit from './Orbit';

const slides = [
	{
		img: 'BLH1550.jpg',
		url: '/Night230S',
		title: 'Night 230 S BNF'
	},
	{
		img: 'BLH9180.jpg',
		url: '/NanoQXFPV2',
		title: 'Nano QX FPV2'
	},
	{
		img: 'BLH7360.jpg',
		url: '/Zeyrok',
		title: 'Zeyrok'
	},
	{
		img: 'BLH9080.jpg',
		url: '/Inductrix200',
		title: 'Inductrix 200'
	},
	{
		img: 'BLH4100.jpg',
		url: '/120s',
		title: '120 S'
	},
	{
		img: 'vortex250pro.jpg',
		url: '/VortexPro',
		title: 'Vortex 250 Pro'
	}
];
export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="small-12 columns">
          <h2>Brand Site POC</h2>
	        <p>The entire business logic of this site is in ~130K of javascript.</p>
	        <p>I'm making one single call to the REST API on Digital Ocean to bootstrap the application. I store the data in a browser version of MongoDB(minimongo).</p>
	        <p>All product display/search results are from queries of minimongo.</p>
	        <p>If a product is not found in minimongo I query the REST API for the data for that product and add it to minimongo to be available for next time it is needed. Mostly only necessary for parts lists.</p>
	        <p>&nbsp;</p>
          <p>This would be the site's homepage.</p>
	        <p>There would likely be a slider and any other relevent marketing.</p>
	        <p>And also social media feeds/links.</p>
	        <p>I chose Blade for this demo, and provided a couple of category links in the header. But any brand would be simple.</p>
	        <p>I've roughed out most functionality. But am taking requests for further functionality.</p>
	        <p>TODOS:
	          <ul>
		          <li>Make a presentable homepage</li>
		          <li>Tweak mobile styles a bit</li>
		          <li>Make product page slideshow more user friendly</li>
		          <li>Integrate jQuery - Everything so far is without jQuery.<br />But it would be useful for some stuff like Foundation.</li>
	          </ul>
	        </p>
        </div>
	      <div className="small-12 columns">
		      <h2>Working on Orbit slider</h2>
		      <Orbit linkbase="http://www.bladeHelis.com" imgbase="http://www.bladeHelis.com/Content/Images/Home/" slides={slides} />
	      </div>
      </div>
    )
  }
}


