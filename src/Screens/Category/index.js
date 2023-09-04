import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Container, List, Col, Row } from "reactstrap";
import ScreenHeader from "../../Components/ScreenHeader";
import { getSingleDocument } from "../../Firebase/functions";
import { setRecipeDetails } from "../RecipeDetails/reducer";
import { NAV_SCREENS } from "../../Navigations/config";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config";
import { doc } from "firebase/firestore";
import CategoryPlayer from "../../Components/CategoryPlayer";
export default function Category(params) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popular_categories = state.categoryReducer.categories.filter(
    (e) => e.is_popular
  );
  const categories = state.categoryReducer.mealType;
  const snapShot = state.homeReducer.recipes;
  const userId = state.profileReducer.userDetails.id;
  const handleItemClick = async (recipe) => {
    // handle single recipe item click
    const _qry = doc(db, `recipes`, recipe.id);
    const recipe_item = await getSingleDocument({ query: _qry });
    dispatch(setRecipeDetails(recipe_item));
    navigate(`${NAV_SCREENS.recipe_details}${recipe.id}`);
  };
  return (
    <Container fluid className="p-0 ">
      <ScreenHeader type="category" />
      {/* <List className="sh-list category-top-list">
        {[...popular_categories].map((item) => (
          <div style={{ border: "1px solid green", color: "black" }}>
            {item.name}
          </div>
        ))}
      </List> */}
      <Row style={{ paddingTop: 200 }}>
        {snapShot.map((item, index) => {
          return (
            <Col md="6" className="home-list-item">
              <Col style={{ marginInline: 20, paddingBottom: 10 }}>
                <CategoryPlayer
                  videoID="video"
                  src={item.video_urls[0]}
                  recipe_name={item.recipe_name}
                  recipe_id={item.id}
                  like_count={item?.favourites.length}
                  favourites={item.favourites}
                  currentUser={userId}
                  isLiked={item?.favourites?.includes(userId) ?? false}
                  profile_name={item.username}
                  post_time={item.createdOn}
                  recipe_props={item}
                  onVideoClick={() => handleItemClick(item)}
                  onVideoFocus={(e) => e.target.play()}
                  onVideoBlur={(e) => e.target.pause()}
                />
                <p
                  style={{
                    textAlign: "justify",
                    maxWidth: "90%",
                    maxLines: 3,
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {item.recipe_description}
                </p>
              </Col>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
