import React, {Component} from 'react';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',//'HorizonHobbyProducts',
      key : '',//'AIzaSyDKzdYCBqdtu0F8oAh2GPB4K2RExdyUzkA',
      earl : 'https://www.googleapis.com/youtube/v3',
      channelId : '',
      videoList: '',
      channels: [],
      playlists: [],
      playlist: [],
      uploadsPlaylistId : '',
      currentPlaylist: '',
      currentChannel: '',
      currentPlaylistId : '',
      currentItems : [],
      currentPlaylistItems : [],
      currentQuery : '',
      maxResults : 5,
      showChannelPlaylists: true,
      urlParams: '?theme=light&autoplay=1&wmode=opaque&rel=0'
    };

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
    this.msg = this.refs.message;
    this.isTouch = false;
  }

  componentWillMount() {
    request
      .get(this.state.earl)
      .use(jsonp)
      .query({
        key: 'AIzaSyDKzdYCBqdtu0F8oAh2GPB4K2RExdyUzkA',

      })
      .end((err, res) => {
        err ? console.log(err) : '';
        console.log(res.body);
      });
  }
  componentDidMount() {
    this.init();
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

  }
  handleChannelListItemClick(e) {
    e.preventDefault();
    const data = e.target.dataSet;
    switch (data.type) {
      case 'channelid':
        this.getId(data.id);
        this.searchBox.value = '';
        this.searchContainer.style.display = 'block';
        break;
      case 'username':
        this.getId(data.id);
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
    if(data.type === 'channelid') {
      this.getId(data.type);
    } else if(data.type === 'username') {
      this.getId(data.username, true);
    }
    this.searchBox.value = '';
    this.searchContainer.style.display = 'block';
    this.setState({currentChannel: data.name});
  }
  init() {
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      document.querySelector('html').classList.add('touch');
      this.isTouch = true;
    }
    this.setState({...this.props})
  }
  getId(id, name) {
	  var data = {
		  part: 'id, contentDetails',
		  key: this.state.key,
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
			  if(res.body.items && res.body.items[0].id){
				  this.setState({
					  channelId: res.body.items[0].id,
					  uploadsPlaylistId: res.body.items[0].contentDetails.relatedPlaylists.uploads
				  }, () => {
					  this.getPlaylistItems(this.state.uploadsPlaylistId);
					  this.playlistSelector.style.display = 'block';
					  this.getPlaylists();
				  });
			  }
		  });
  }
  getSearchItems() {

  }
  getPlaylists() {

  }
  getPlaylistItems() {

  }
  getVideoItems() {

  }
  render() {
    return ( <section ref="videoContainer" className="white-section yt-plugin">
        <div className="row">
          <div className="large-12 medium-12 small-12 columns iframe-container">
            <div className="iframe-padding"></div>
            <iframe ref="iframe" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div className="row">
          <div ref="descContainer" className="large-12 medium-12 small-12 columns desc-container under">
            <h4></h4>
            <p></p>
          </div>
        </div>
        <div ref="controlBar" className="row control-bar">
          <div ref="channelContainer" className="large-4 medium-12 small-12 columns channel-container">
            <div className="channel-selector">
              <h5 ref="currentChannel" className="current-channel">{this.state.currentChannel}</h5>
              <ul className="sub-menu">
                {(this.state.channels.length > 0) && this.state.channels.map((item) => (
                  <li>
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
            <h6 ref="message" className="msg"></h6>
            <div ref="playlistSelector" className="playlist-selector">
              <h5 ref="currentPlaylist" className="current-playlist">{this.state.currentPlaylist}</h5>
              <ul className="sub-menu">
                {(this.state.playlist.length > 0) && this.state.playlist.map((item) => (
                  <li>
                    <a
                      className={item.type}
                      href={item.name}
                      data-id={item.id}
                      data-type={item.type}
                      data-name={item.name}
                      onClick={(e) => this.handlePlayListItemClick(e)}>{item.name}
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
            <a ref="prevArrow" className="prev-arrow"></a><a ref="nextArrow" className="next-arrow"></a>
            <ul ref="thumbList" className="small-block-grid-2 medium-block-grid-5 large-block-grid-5 thumbs-list"></ul>
          </div>
        </div>
      </section>
    )
  }
}
