import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Editable from "../Editable";

export default function VideoContent({ videoId , frameId = `${Math.random()}`}) {
  const [videoIdState, setVideoIdState] = useState(videoId);
  const [videoFrame, setvideoFrame] = useState('<div id="pppppppppp"></div>');

  let key = "AIzaSyACfe4ntiPnLXFTvUkNbnH2fpv47Br_-ig";

  function resizeIframe() {
    //let arr = document.getElementById(frameId).getElementById("iframe");
    const myDiv = document.getElementById(frameId);
    const iframes = myDiv.getElementsByTagName('iframe');

    let size = 50;
    for (let obj of iframes) {
      let r = obj.height / obj.width;
      obj.style.height = `${r * size}vw`;
      obj.style.width = `${size}vw`;
    }
  }
  if (videoId != videoIdState) {
    setVideoIdState(videoId);
  }
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=player&id=${videoIdState}&key=${key}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.items[0]) {
          setvideoFrame(data.items[0].player.embedHtml);
        }
      });
  }, [videoIdState]);

  useEffect(resizeIframe, [videoFrame]);

  let container = (
    <div
      id={frameId}
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
