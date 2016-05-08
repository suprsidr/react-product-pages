import React, {Component} from 'react';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      apiKey: '',
      earl: 'https://www.googleapis.com/youtube/v3',
      channelId: '',
      videoList: '',
      channels: [],
      playlists: [],
      playlist: [],
      uploadsPlaylistId : '',
      currentPlaylist: '',
      currentChannel: '',
      currentPlaylistId : '',
      currentThumnailItems : [],
      currentPlaylistItems : [],
      currentDescription: '',
      currentTitle: '',
      currentIframeSrc: '',
      currentQuery : '',
      hasMore: '',
      maxResults : 5,
      showChannelPlaylists: true,
      urlParams: '?theme=light&autoplay=1&wmode=opaque&rel=0',
      nextArrowDisplay: 'none',
      prevArrowDisplay: 'none',
	    prevPageToken: null,
	    nextPageToken: null,
      message: ''
    };
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.element = this.refs.videoContainer;
    this.thumbList = this.refs.thumbList;
    this.iframe = this.refs.iframe;
    this.descContainer = this.refs.descContainer;
    this.channelContainer = this.refs.channelContainer;
    this.currentChannel = this.refs.currentChannel;
    this.prevArrow = this.refs.prevArrow;
    this.nextArrow = this.refs.nextArrow;
    this.controlBar = this.refs.controlBar;
    this.searchBox = this.refs.searchBox;
    this.searchContainer = this.refs.searchContainer;
    this.playlistSelector = this.refs.playlistSelector;
    this.message = this.refs.message;
    this.init();
	  console.log(this.autoPlay);
  }
  handleSearchClick(e) {
    e.preventDefault();
    this.getSearchItems(this.refs.searchBox.value);
  }
  handleSearchBoxKeyup(e) {
    const code = (typeof e.which === 'number') ? e.which : e.keyCode;
    if(code === 13) {
      this.handleSearchClick(e);
    }
  }
  handlePlayListItemClick(e) {
    e.preventDefault();
    const data = e.target.dataset;
    this.setState({
      currentPlaylist: data.name
    }, () => {
      this.searchContainer.style.display = 'none';
      this.searchBox.value = '';
      this.getPlaylistItems(data.id)
    })
  }
  handleChannelListItemClick(e) {
    e.preventDefault();
    const data = e.target.dataset;
    this.setState({currentChannel: data.name});
    switch (data.type) {
      case 'channelid':
        this.getId(data.id);
        this.searchBox.value = '';
        this.searchContainer.style.display = 'block';
        break;
      case 'username':
        this.getId(data.id, true);
        this.searchBox.value = '';
        this.searchContainer.style.display = 'block';
        break;
      case 'playlistid':
        this.getPlaylistItems(data.id);
        this.searchBox.value = '';
        this.searchContainer.style.display = 'none';
        this.playlistSelector.style.display = 'none';
        break;
    }
  }
  handleThumnailItemClick(e) {
    e.preventDefault();
    const data = e.currentTarget.dataset;
    this.setState({
      currentIframeSrc: `//www.youtube.com/embed/${data.id}${this.state.urlParams}`,
      currentDescription: this.createClickableUrls(data.desc),
      currentTitle: data.title,
      hasMore: data.desc.length > 300 ? 'has-more' : ''
    })
  }
  handleMoreClick(e) {
    e.preventDefault();
    this.setState({hasMore: ''});
  }
	handlePrevArrowClick(e) {
		e.preventDefault();
		this.getPlaylistItems(this.state.currentPlaylistId, this.state.prevPageToken);
	}
	handleNextArrowClick(e) {
		e.preventDefault();
		this.getPlaylistItems(this.state.currentPlaylistId, this.state.nextPageToken);
	}
  init() {
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      document.querySelector('html').classList.add('touch');
    }
    this.setState({...this.props}, () => {
      if(this.state.videoList.length) {
        this.getVideoItems(this.state.videoList);
      } else if(this.state.channels.length > 0) {
        this.channelContainer.querySelector('a').click();
      } else if(this.state.username !== '') {
        this.getId(this.state.username, true);
        this.channelContainer.querySelector('a').click();
      }
    });
  }
  getId(id, name) {
	  var data = {
		  part: 'id, contentDetails',
		  key: this.state.apiKey,
		  maxResults: this.state.maxResults
	  };
	  if(name) {
		  data.forUsername = id;
	  } else {
		  data.id = id;
	  }
	  request
		  .get(this.state.earl + '/channels')
		  .use(jsonp)
		  .query(data)
		  .end((err, res) => {
			  err ? console.log(err) : '';
        console.log('getID: ', res);
			  if(res.body.items && res.body.items.length > 0 && res.body.items[0].id){
				  this.setState({
					  channelId: res.body.items[0].id,
					  uploadsPlaylistId: res.body.items[0].contentDetails.relatedPlaylists.uploads
				  }, () => {
            console.log('state updated: ', this.state);
            this.state.uploadsPlaylistId && this.getPlaylistItems(this.state.uploadsPlaylistId);
					  this.playlistSelector.style.display = 'block';
					  this.getPlaylists();
				  });
			  }
		  });
  }
  getSearchItems(query, token) {
	  const data = {
		  part: 'snippet',
		  key: this.state.apiKey,
		  q: query,
		  channelId: this.state.channelId,
		  maxResults: this.state.maxResults,
		  order: 'date', // rating, relevance, title, videoCount and viewCount
		  pageToken: token || null
	  };
	  this.setState({currentQuery: query});
	  request
		  .get(this.state.earl + '/search')
		  .use(jsonp)
		  .query(data)
		  .end((err, res) => {
			  err ? console.log(err) : '';
			  if(res.body.items && res.body.items.length > 0){
				  this.setState({
					  currentThumnailItems: res.body.items.map((item) => {
						  // search item different than other query results & missing videoId - bad google!
						  return Object.assign(item, {
							  snippet: Object.assign(item.snippet, {
								  resourceId: {
									  videoId: item.id.videoId
								  }
							  }),
							  contentDetails: {
								  note: item.snippet.title
							  }
						  })
					  })
				  }, this.clickFirstThumbnail());
				  this.handleTokens(res.body);
			  }
		  });
  }
  getPlaylists() {
    const data = {
      part: 'snippet,contentDetails',
      key: this.state.apiKey,
      channelId: this.state.channelId,
      maxResults: 50
    };
    request
      .get(this.state.earl + '/playlists')
      .use(jsonp)
      .query(data)
      .end((err, res) => {
        err ? console.log(err) : '';
        if(res.body.items && res.body.items.length > 0){
          res.body.items.unshift({
            id: this.state.uploadsPlaylistId,
            snippet: {
              title: 'Uploads'
            }
          });
          this.setState({
            playlists: res.body.items,
            currentPlaylistItems: res.body.items,
            currentPlaylist: res.body.items[0].snippet.title
          });
        }
      });

  }
  getPlaylistItems(playlistId, token) {
    const data = {
      part: 'snippet,contentDetails',
      key: this.state.apiKey,
      playlistId: playlistId,
      maxResults: this.state.maxResults,
      order: 'date', // rating, relevance, title, videoCount and viewCount
      pageToken: token || ''
    };
    this.setState({currentPlaylistId: playlistId});
    request
      .get(this.state.earl + '/playlistItems')
      .use(jsonp)
      .query(data)
      .end((err, res) => {
        err ? console.log(err) : '';
        if(res.body.items && res.body.items.length > 0){
          this.setState({
            currentThumnailItems: res.body.items
          }, this.clickFirstThumbnail());
	        this.handleTokens(res.body);
        }
      });
  }
  getVideoItems(videoList) {
    const data = {
      id: videoList,
      part: 'snippet',
      key: self.options.key
    };
    request
      .get(this.state.earl + '/videos')
      .use(jsonp)
      .query(data)
      .end((err, res) => {
        err ? console.log(err) : '';
        if(res.body.items && res.body.items.length > 0){
          this.setState({
            currentThumnailItems: res.body.items
          }, this.clickFirstThumbnail());
	        this.handleTokens(res.body);
        }
      });

  }
	clickFirstThumbnail() {
		window.setTimeout(() => {
			(this.state.currentIframeSrc === '') && document.querySelector('.thumbs-list a').click();
		}, 0);
	}
	handleTokens(data) {
		if(data.prevPageToken) {
			this.setState({prevPageToken: data.prevPageToken, prevArrowDisplay: 'block'});
		} else {
			this.setState({prevPageToken: null, prevArrowDisplay: 'none'});
		}
		if(data.nextPageToken) {
			this.setState({nextPageToken: data.nextPageToken, nextArrowDisplay: 'block'});
		} else {
			this.setState({nextPageToken: null, nextArrowDisplay: 'none'});
		}
	}
  displayMsg(txt) {
    this.setState({message: txt}, ()=> this.message.style.height = '20px');
    setTimeout(function(){
      this.setState({message: ''}, ()=> this.message.style.height = '0px');
    }, 4000);
  }
  // create clickable urls
  createClickableUrls(txt) {
    return txt.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1" target="_blank">$1</a>');
  }
	createMarkup(html) {
		return {__html: html};
	}
  render() {
    return ( <section ref="videoContainer" className="white-section yt-plugin">
        <div className="row">
          <div className="large-12 medium-12 small-12 columns iframe-container">
            <div className="iframe-padding"></div>
            {(this.state.currentIframeSrc !== '') && <iframe src={this.state.currentIframeSrc} ref="iframe" frameBorder={0} allowFullScreen={true}></iframe>}
          </div>
        </div>
        <div className="row">
          <div ref="descContainer" className="large-12 medium-12 small-12 columns desc-container under">
            <h4>{this.state.currentTitle}</h4>
            <p className={this.state.hasMore}>
              <span dangerouslySetInnerHTML={this.createMarkup(this.state.currentDescription)}></span>
	            {(this.state.hasMore !== '') && <a href="more" className="more" onClick={(e) => this.handleMoreClick(e)} >Read More...</a>}
            </p>
          </div>
        </div>
        <div ref="controlBar" className="row control-bar">
          <div ref="channelContainer" className="large-4 medium-12 small-12 columns channel-container">
            <div className="channel-selector">
              <h5 ref="currentChannel" className="current-channel">{this.state.currentChannel}</h5>
              <ul className="sub-menu">
                {this.state.channels.map((item, i) => (
                  <li key={i}>
                    <a
                      className={item.type}
                      href={item.name}
                      data-id={item.id}
                      data-type={item.type}
                      data-name={item.name}
                      onClick={(e) => this.handleChannelListItemClick(e)}>{item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="large-4 medium-6 small-12 columns playlist-container">
            <h6 ref="message" className="msg" style={{height: 0, display: 'block'}}>{this.state.message}</h6>
            <div ref="playlistSelector" className="playlist-selector">
              <h5 ref="currentPlaylist" className="current-playlist">{this.state.currentPlaylist}</h5>
              <ul className="sub-menu">
                {this.state.playlists.map((item, i) => (
                  <li key={i}>
                    <a
                      className='playlistid'
                      href={item.snippet.title}
                      data-id={item.id}
                      data-name={item.snippet.title}
                      onClick={(e) => this.handlePlayListItemClick(e)}>{item.snippet.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="large-4 medium-6 small-12 columns button-container text-center">
            <div ref="searchContainer" className="row collapse search-container">
              <div className="small-10 columns">
                <input ref="searchBox" className="search-box" type="text" placeholder="Search this channel" onKeyUp={(e) => this.handleSearchBoxKeyup(e)}/>
              </div>
              <div className="small-2 columns">
                <a ref="searchButton" className="button postfix" href="#search" onClick={(e) => this.handleSearchClick(e)}>Go</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="large-12 medium-12 small-12 columns thumbs-list-container">
            <a ref="prevArrow" className="prev-arrow" style={{display: this.state.prevArrowDisplay}} onClick={(e) => this.handlePrevArrowClick(e)}></a>
	          <a ref="nextArrow" className="next-arrow" style={{display: this.state.nextArrowDisplay}} onClick={(e) => this.handleNextArrowClick(e)}></a>
            <div ref="thumbList" className="row small-up-2 medium-up-4 large-up-5 thumbs-list">
              {this.state.currentThumnailItems.map((item, i) => (
                <div className="column text-center" key={i}>
                  <a
                    href="#"
                    data-id={item.snippet.resourceId.videoId}
                    data-title={item.contentDetails.note || item.snippet.title}
                    data-desc={item.snippet.description || ''}
                    onClick={(e) => this.handleThumnailItemClick(e)} >
                    <img src={item.snippet.thumbnails.medium.url} />
                  </a>
                  <p>{item.contentDetails.note || item.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
