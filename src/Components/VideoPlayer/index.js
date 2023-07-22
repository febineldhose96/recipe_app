import React from "react";
import "./styles.css";
function VideoPlayer({ src, autoPlay = false, ...props }) {
  return (
    <div>
      <video src={src} {...props} className="videoplayer" autoPlay={autoPlay} />
    </div>
  );
}

export default VideoPlayer;
