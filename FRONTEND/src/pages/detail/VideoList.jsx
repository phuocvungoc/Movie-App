import React, { useState, useEffect, useRef } from "react";

import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(props.id);
      console.log(res);
      setVideo(res);
    };
    getVideos();
  }, [props.id]);
  if (video !== null) {
    return <Video item={video} />;
  } else
    return (
      <div>
        <h1>Not Found Video!</h1>
      </div>
    );
};

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
