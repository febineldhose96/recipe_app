import React, { memo } from "react";
import "./styles.css";
function VideoPlayer({ src, autoPlay = false, onClick = () => {}, ...props }) {
  return (
    <div onClick={onClick}>
      <video src={src} {...props} className="videoplayer" autoPlay={autoPlay} />
    </div>
  );
}

export default memo(VideoPlayer);
