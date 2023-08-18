import React, { forwardRef, memo } from "react";
import "./styles.css";
const VideoPlayer = forwardRef(function (
  {
    src,
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
      loop={loop}
      className={playerStyle}
      ref={ref}
      src={src}
      muted={muted}
      onClick={onClick}
      autoPlay={autoPlay}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onCanPlay={onCanPlay}
    />
  );
});

export default memo(VideoPlayer);
