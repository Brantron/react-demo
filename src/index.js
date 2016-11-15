import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import YOUTUBE_KEY from './components/api_keys';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = YOUTUBE_KEY;

// Create a new component which produces html
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('test');

  }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      });
    }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

// Put it in the dom
ReactDOM.render(<App />, document.querySelector('.container'));
