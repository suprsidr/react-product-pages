import React from 'react';
import Video from './Video';

export const VideoPage = () => (
  <div>
    <Video
      apiKey="AIzaSyDKzdYCBqdtu0F8oAh2GPB4K2RExdyUzkA"
      channels={[{name: 'Blade Helis', id: 'bladehelis', type: 'username'}]}
      maxResults={5}
      urlParams="?theme=light&autoplay=1&wmode=opaque&rel=0"
    />
  </div>
);