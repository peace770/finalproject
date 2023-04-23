import React from 'react'
import VideoContent from './VideoContent';
import TextContent from './TextContent'

export default function ContentFactory({type, content, url}) {
    switch (type) {
        case 'video':
            return           <VideoContent videoId={youtube_parser(url)} />;
        case 'text':
            return <TextContent content={content}/>
    }
  return ( <></>
  )
}

function youtube_parser(url) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[1].length == 11 ? match[1] : false;
  }
  