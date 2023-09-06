import React from "react";
import "./styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
export default function ImageContainer({ video_urls = [] }) {
  return (
    <div className="dt_imageWrapper">
      {video_urls.map((url, index) => {
        return (
          <video
            key={index}
            src={url}
            alt="recipe_img"
            className="dt_thumbImage"
            controls
          />
        );
      })}
    </div>
  );
}
