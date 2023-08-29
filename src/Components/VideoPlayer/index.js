import React, { forwardRef, memo } from "react";
import "./styles.css";
const VideoPlayer = forwardRef(function (
  {
    src,
    key,
    videoID,
    muted,
    loop = false,
    autoPlay = false,
    onClick = () => {},
    mainclassStyle,
    playerStyle = "videoplayer",
    onMouseOver = () => {},
    onMouseOut = () => {},
    onFocus = () => {},
    onCanPlay = () => {},
    ...props
  },
  ref
) {
  return (
    <video
      id={videoID}
      key={key}
      loop={loop}
      className={playerStyle}
      ref={ref}
      muted={muted}
      onClick={onClick}
      autoPlay={autoPlay}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onCanPlay={onCanPlay}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});

export default memo(VideoPlayer);
