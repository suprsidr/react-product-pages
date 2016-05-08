import React, {Component} from 'react';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

class BloggerFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedItems: []
		};
	}
	componentDidMount() {
		this.init();
	}
	init() {
		request
				.get(this.props.feedUrl)
				.use(jsonp)
				.query({alt: 'json', 'max-results': this.props.maxResults})
				.end((err, res) => {
					err ? console.log(err) : '';
					//console.log('feed data: ', res.body);
					this.setState({feedItems: res.body.feed.entry})
				});
	}
	render() {
		return (
				<div className="blogger-posts">
					{this.props.title && <h3>{this.props.title}</h3>}
					{this.state.feedItems.map((item) => (
						<div>
							<p>
								<a target="_blank" href={item.link.filter((link) => link.rel === 'alternate')[0].href}>
									{item.media$thumbnail &&
									<img className="thumbnail" src={item.media$thumbnail.url} alt={item.title.$t || 'Title Unavailable'}/>}
									{item.title.$t || 'Title Unavailable'}
								</a>
							</p>
							<p className="text-right">
								{item.published.$t.substring(0, 10)}
							</p>
						</div>
					))}
				</div>
		)
	}
}
BloggerFeed.defaultProps = {
	maxResults: 10
};
BloggerFeed.propTypes = {
	feedUrl: React.PropTypes.string.isRequired,
	maxResults: React.PropTypes.number,
	title: React.PropTypes.string
};
export default BloggerFeed;