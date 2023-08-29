import React, { forwardRef, memo, useCallback, useState } from "react";
import "./styles.css";
import VideoPlayer from "../VideoPlayer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { TbBadge } from "react-icons/tb";
import { db } from "../../Firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
const PlayerStack = forwardRef(function (
  {
    videoID,
    currentUser = null,
    src,
    key,
    loop,
    muted,
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
  },
  ref
) {
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
    <div className="playerstack">
      <div className="top_container">
        <div className="profile_img_wrapper">
          <img
            className="prof_img_style"
            alt="profile_img"
            src={require("../../assets/images/profile_image.png")}
          />
        </div>
        <h3 className="profile_name">{profile_name}</h3>
        <p className="recipe_post_time">{moment.utc(post_time).fromNow()}</p>
      </div>
      <h4 className="recipe_name">{recipe_name}</h4>
      <video
        ref={ref}
        muted
        // key={key}
        loop={loop}
        style={{
          height: 650,
          width: "100%",
          objectFit: "contain",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="bottom_Container">
        <div className="container">
          {Liked ? (
            <AiFillHeart
              className="Like_icon"
              onClick={handleLikeButtonPress}
            />
          ) : (
            <AiOutlineHeart
              className="icon_style"
              onClick={handleLikeButtonPress}
            />
          )}
          <FaRegComment className="icon_style" />
          <FaShare className="icon_style" />
          <div className="icon_wrapper_1">
            <TbBadge className="icon_style_badge" />
          </div>
        </div>
        <p className="like_count">
          {like_count > 1 ? like_count + " Likes" : like_count + " Like"}
        </p>
      </div>
    </div>
  );
});

export default memo(PlayerStack);
