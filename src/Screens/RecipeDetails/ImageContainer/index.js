import React from "react";
import "./styles.css";
import { isArray } from "../../../Config/checkers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
export default function ImageContainer({ imageUrls = [] }) {
  const settings =
    isArray(imageUrls) && imageUrls.length < 2
      ? {
          showIndicators: false,
          showThumbs: false,
        }
      : {};
  return (
    <div className="dt_imageWrapper" {...settings}>
      {imageUrls.map((url, index) => {
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
