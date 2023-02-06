import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function VideoContent({ videoId }) {
  // {
  //     "kind": "youtube#video",
  //     "etag": etag,
  //     "id": string,
  //     "snippet": {
  //       "publishedAt": datetime,
  //       "channelId": string,
  //       "title": string,
  //       "description": string,
  //       "thumbnails": {
  //         (key): {
  //           "url": string,
  //           "width": unsigned integer,
  //           "height": unsigned integer
  //         }
  //       },
  //       "channelTitle": string,
  //       "tags": [
  //         string
  //       ],
  //       "categoryId": string,
  //       "liveBroadcastContent": string,
  //       "defaultLanguage": string,
  //       "localized": {
  //         "title": string,
  //         "description": string
  //       },
  //       "defaultAudioLanguage": string
  //     },
  //     "contentDetails": {
  //       "duration": string,
  //       "dimension": string,
  //       "definition": string,
  //       "caption": string,
  //       "licensedContent": boolean,
  //       "regionRestriction": {
  //         "allowed": [
  //           string
  //         ],
  //         "blocked": [
  //           string
  //         ]
  //       },
  //       "contentRating": {
  //         "acbRating": string,
  //         "agcomRating": string,
  //         "anatelRating": string,
  //         "bbfcRating": string,
  //         "bfvcRating": string,
  //         "bmukkRating": string,
  //         "catvRating": string,
  //         "catvfrRating": string,
  //         "cbfcRating": string,
  //         "cccRating": string,
  //         "cceRating": string,
  //         "chfilmRating": string,
  //         "chvrsRating": string,
  //         "cicfRating": string,
  //         "cnaRating": string,
  //         "cncRating": string,
  //         "csaRating": string,
  //         "cscfRating": string,
  //         "czfilmRating": string,
  //         "djctqRating": string,
  //         "djctqRatingReasons": [,
  //           string
  //         ],
  //         "ecbmctRating": string,
  //         "eefilmRating": string,
  //         "egfilmRating": string,
  //         "eirinRating": string,
  //         "fcbmRating": string,
  //         "fcoRating": string,
  //         "fmocRating": string,
  //         "fpbRating": string,
  //         "fpbRatingReasons": [,
  //           string
  //         ],
  //         "fskRating": string,
  //         "grfilmRating": string,
  //         "icaaRating": string,
  //         "ifcoRating": string,
  //         "ilfilmRating": string,
  //         "incaaRating": string,
  //         "kfcbRating": string,
  //         "kijkwijzerRating": string,
  //         "kmrbRating": string,
  //         "lsfRating": string,
  //         "mccaaRating": string,
  //         "mccypRating": string,
  //         "mcstRating": string,
  //         "mdaRating": string,
  //         "medietilsynetRating": string,
  //         "mekuRating": string,
  //         "mibacRating": string,
  //         "mocRating": string,
  //         "moctwRating": string,
  //         "mpaaRating": string,
  //         "mpaatRating": string,
  //         "mtrcbRating": string,
  //         "nbcRating": string,
  //         "nbcplRating": string,
  //         "nfrcRating": string,
  //         "nfvcbRating": string,
  //         "nkclvRating": string,
  //         "oflcRating": string,
  //         "pefilmRating": string,
  //         "rcnofRating": string,
  //         "resorteviolenciaRating": string,
  //         "rtcRating": string,
  //         "rteRating": string,
  //         "russiaRating": string,
  //         "skfilmRating": string,
  //         "smaisRating": string,
  //         "smsaRating": string,
  //         "tvpgRating": string,
  //         "ytRating": string
  //       },
  //       "projection": string,
  //       "hasCustomThumbnail": boolean
  //     },

  //     "player": {
  //       "embedHtml": string,
  //       "embedHeight": long,
  //       "embedWidth": long
  //     },
  //     "topicDetails": {
  //       "topicIds": [
  //         string
  //       ],
  //       "relevantTopicIds": [
  //         string
  //       ],
  //       "topicCategories": [
  //         string
  //       ]
  //     },
  //     "recordingDetails": {
  //       "recordingDate": datetime
  //     },
  //     "fileDetails": {
  //       "fileName": string,
  //       "fileSize": unsigned long,
  //       "fileType": string,
  //       "container": string,
  //       "videoStreams": [
  //         {
  //           "widthPixels": unsigned integer,
  //           "heightPixels": unsigned integer,
  //           "frameRateFps": double,
  //           "aspectRatio": double,
  //           "codec": string,
  //           "bitrateBps": unsigned long,
  //           "rotation": string,
  //           "vendor": string
  //         }
  //       ],
  //       "audioStreams": [
  //         {
  //           "channelCount": unsigned integer,
  //           "codec": string,
  //           "bitrateBps": unsigned long,
  //           "vendor": string
  //         }
  //       ],
  //       "durationMs": unsigned long,
  //       "bitrateBps": unsigned long,
  //       "creationTime": string
  //     },
  //     "processingDetails": {
  //       "processingStatus": string,
  //       "processingProgress": {
  //         "partsTotal": unsigned long,
  //         "partsProcessed": unsigned long,
  //         "timeLeftMs": unsigned long
  //       },
  //       "processingFailureReason": string,
  //       "fileDetailsAvailability": string,
  //       "processingIssuesAvailability": string,
  //       "tagSuggestionsAvailability": string,
  //       "editorSuggestionsAvailability": string,
  //       "thumbnailsAvailability": string
  //     },
  //     "suggestions": {
  //       "processingErrors": [
  //         string
  //       ],
  //       "processingWarnings": [
  //         string
  //       ],
  //       "processingHints": [
  //         string
  //       ],
  //       "tagSuggestions": [
  //         {
  //           "tag": string,
  //           "categoryRestricts": [
  //             string
  //           ]
  //         }
  //       ],
  //       "editorSuggestions": [
  //         string
  //       ]
  //     },
  //     "liveStreamingDetails": {
  //       "actualStartTime": datetime,
  //       "actualEndTime": datetime,
  //       "scheduledStartTime": datetime,
  //       "scheduledEndTime": datetime,
  //       "concurrentViewers": unsigned long,
  //       "activeLiveChatId": string
  //     },
  //     "localizations": {
  //       (key): {
  //         "title": string,
  //         "description": string
  //       }
  //     }
  //   }
  const [videoFrame, setvideoFrame] = useState('<div id="pppppppppp"></div>');

  let key = "AIzaSyACfe4ntiPnLXFTvUkNbnH2fpv47Br_-ig";

  function resizeIframe() {
    let arr = document.getElementsByTagName('iframe');
    let size = 50;
    for (let obj of arr) {
      let r = obj.height / obj.width;
      obj.style.height = `${r * size}vw`;
      obj.style.width = `${size}vw`;
    }
  }

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${key}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.items[0])
        {
        setvideoFrame(data.items[0].player.embedHtml);
        
      }
      });
  }, []);

  useEffect(resizeIframe, [videoFrame]);

  let container = (
    <div
       id={`${videoId}`}
      dangerouslySetInnerHTML={{ __html: videoFrame }}
    ></div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {container}
    </Box>
  );
}
