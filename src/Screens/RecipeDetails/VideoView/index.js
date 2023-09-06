import React, { useCallback, useState } from "react";
import "./styles.css";
import { FaClock, FaShare } from "react-icons/fa";
import { Container, Row, Col } from "reactstrap";
import IMAGE_ASSETS from "../../../assets/images";
import { useSelector } from "react-redux";
export default function VideoView({
  creatorname = "",
  recipeID = "",
  profile_Url = "",
  recipename = "" | undefined,
  recipe_description = "" | undefined,
  recipe_prepTime = 0,
  recipe_cookTime = 0,
  onSaveClick = () => {},
  onPostBtnClick = () => {},
}) {
  const [comment, setComment] = useState(null);
  const state = useSelector((state) => state);
  const recipe = state.recipeDetails.recipe_details;
  const handleInputChange = useCallback(
    ({ target }) => {
      setComment(target.value);
    },
    [setComment]
  );
  const handlePost = useCallback(() => {
    onPostBtnClick(comment);
  }, [onPostBtnClick, comment]);
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  return (
    <Container className="recipe-details-container">
      <div className="row-s-p-container m-b-10-Container">
        <div className="row-component">
          <img src={IMAGE_ASSETS.person_icon} height={20} width={20} />
          <h4 className="h4-white-color">UserName</h4>
        </div>
        <div className="row-component">
          <div className="row-component">
            <img src={IMAGE_ASSETS.saved_icon} height={20} width={20} />
            <h4 className="h4-white-color">Save</h4>
          </div>

          <div className="row-component">
            <FaShare className="text-green-Color" />
            <h4 className="h4-white-color">Share</h4>
          </div>
        </div>
      </div>
      <Row>
        <video
          src={recipe.video_urls[0]}
          controls
          className="recipe-details-video"
        />
      </Row>
      <div className="row-s-p-container m-b-10-Container">
        <div className="row-component">
          <h4 className="h4-white-color text-green-Color">
            {recipe.recipe_name}
          </h4>
        </div>
        <div className="row-component">
          <div className="row-component">
            <img src={IMAGE_ASSETS.saved_icon} height={20} width={20} />
            <h4 className="h4-white-color">Save</h4>
          </div>
          <div className="row-component">
            <FaShare className="text-green-Color" />
            <h4 className="h4-white-color">Share</h4>
          </div>
        </div>
      </div>
    </Container>
  );
}
