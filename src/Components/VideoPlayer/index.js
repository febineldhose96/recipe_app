import React, { forwardRef, memo } from "react";
import "./styles.css";
const VideoPlayer = forwardRef(function (
  {
    src,
    videoID,
    autoPlay = false,
    muted,
    loop = false,
    playing = false,
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
      autoPlay={true}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onCanPlay={onCanPlay}
    />
  );
});

export default memo(VideoPlayer);
