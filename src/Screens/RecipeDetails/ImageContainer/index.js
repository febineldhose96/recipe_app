import React from "react";
import "./styles.css";
import { isArray } from "../../../Config/checkers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function ImageContainer({ imageUrls = [] }) {
  const settings =
    isArray(imageUrls) && imageUrls.length < 2
      ? {
          showIndicators: false,
          showThumbs: false,
        }
      : {};
  return (
    <Carousel className="dt_imageWrapper" {...settings}>
      {imageUrls.map((url, index) => {
        return (
          <img
            key={index}
            src={url}
            alt="recipe_img"
            className="dt_thumbImage"
          />
        );
      })}
    </Carousel>
  );
}
