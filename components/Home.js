import React, {Component} from 'react';
import Orbit from './Orbit';
import BloggerFeed from './BloggerFeed';

const slides = [
	{
		img: 'BLH1550.jpg',
		url: '/product/BLH1550',
		title: 'Night 230 S BNF'
	},
	{
		img: 'BLH9180.jpg',
		url: '/product/BLH9180',
		title: 'Nano QX FPV2'
	},
	{
		img: 'BLH7360.jpg',
		url: '/search/zeyrok',
		title: 'Zeyrok'
	},
	{
		img: 'BLH9080.jpg',
		url: '/product/BLH9080',
		title: 'Inductrix 200'
	},
	{
		img: 'BLH4100.jpg',
		url: '/product/BLH4100',
		title: '120 S'
	},
	{
		img: 'vortex250pro.jpg',
		url: '/product/BLH9250',
		title: 'Vortex 250 Pro'
	}
];
export default class Home extends Component {
  render() {
    return (
		    <div>
			    <div className="row">
				    <div className="small-12 columns">
					    <Orbit linkbase="" imgbase="http://www.bladeHelis.com/Content/Images/Home/" slides={slides}/>
				    </div>
			    </div>
			    <div className="row">
				    <div className="small-12 medium-6 large-4 columns">
					    <BloggerFeed feedUrl="http://bladehelis.blogspot.com/feeds/posts/default" maxResults={10} title="Latest News"/>
				    </div>
				    <div className="small-12 medium-6 large-4 columns">&nbsp;</div>
				    <div className="small-12 medium-6 large-4 columns">&nbsp;</div>
			    </div>
			    <div className="row">
				    <div className="small-12 columns">
					    <h2>Brand Site POC</h2>
					    <p>The entire business logic of this site is in ~130K of javascript.</p>
					    <p>I'm making one single call to the REST API on Digital Ocean to bootstrap the application. I store the
						    data in a browser version of MongoDB(minimongo).</p>
					    <p>All product display/search results are from queries of minimongo.</p>
					    <p>If a product is not found in minimongo I query the REST API for the data for that product and add it to
						    minimongo to be available for next time it is needed. Mostly only necessary for parts lists.</p>
					    <p>&nbsp;</p>
					    <p>This would be the site's homepage.</p>
					    <p>There would likely be a slider and any other relevent marketing.</p>
					    <p>And also social media feeds/links.</p>
					    <p>I chose Blade for this demo, and provided a couple of category links in the header. But any brand would
						    be simple.</p>
					    <p>I've roughed out most functionality. But am taking requests for further functionality.</p>
					    <p>TODOS:
						    <ul>
							    <li>Make a presentable homepage</li>
							    <li>Tweak mobile styles a bit</li>
							    <li>Make product page slideshow more user friendly</li>
							    <li><s>Integrate jQuery - Everything so far is without jQuery.<br />But it would be useful for some
								    stuff like Foundation.</s></li>
						    </ul>
					    </p>
				    </div>
			    </div>
		    </div>
    )
  }
}


