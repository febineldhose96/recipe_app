import React, { memo, useCallback, useState } from "react";
import "./styles.css";
import VideoPlayer from "../VideoPlayer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { TbBadge } from "react-icons/tb";
import { db } from "../../Firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { Col, Container, Row } from "reactstrap";
function PlayerStack({
  videoID,
  currentUser = null,
  src,
  controls = false,
  recipe_name = "",
  profile_name = "",
  post_time = "",
  like_count = 44,
  isLiked = false,
  autoPlay = false,
  recipe_id = "",
  favourites = [],
  recipe_props = {},
  onLikeButtonPress = () => {},
  onVideoClick = () => {},
  onVideoFocus = () => {},
  onVideoBlur = () => {},
  ...props
}) {
  const [Liked, setLiked] = useState(isLiked);
  const handleLikeButtonPress = useCallback(() => {
    const dbRef = doc(db, `recipes/${recipe_id}`);
    const _favFitlr = Liked
      ? [...favourites].filter((e) => e !== currentUser)
      : [...favourites, currentUser];
    updateDoc(dbRef, {
      favourites: _favFitlr,
    })
      .then((e) => {
        console.log("Success");
      })
      .catch((e) => console.log("errorr", e));
    setLiked(!Liked);
    onLikeButtonPress(!Liked);
  }, [onLikeButtonPress, setLiked, Liked, currentUser, favourites, recipe_id]);
  return (
    <div className="pl-main-style">
      <VideoPlayer
        autoPlay={autoPlay}
        videoID={videoID}
        src={src}
        controls={controls}
        loop={true}
        muted={true}
        onClick={onVideoClick}
        onMouseOver={onVideoFocus}
        onMouseOut={onVideoBlur}
      />

      <div className="home-bottom-row">
        <h3 className="home-recipe-name">{recipe_name}</h3>
        <div className="hm-recipe-right-end-wrapper">
          <div className="hm-recipe-fav-wrapper">
            {Liked ? (
              <AiFillHeart
                className="hm-like-icon-active"
                onClick={handleLikeButtonPress}
              />
            ) : (
              <AiOutlineHeart
                className="hm-like-icon-inactive"
                onClick={handleLikeButtonPress}
              />
            )}
            <p className="home-like_count">{like_count}</p>
          </div>

          {Liked ? (
            <TbBadge
              className="hm-badge-icon-active"
              onClick={handleLikeButtonPress}
            />
          ) : (
            <TbBadge
              className="hm-badge-icon-inactive"
              onClick={handleLikeButtonPress}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerStack);
