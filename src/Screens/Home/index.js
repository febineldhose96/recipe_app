import React, { memo, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/config";
import "./styles.css";
import PlayerStack from "../../Components/PlayerStack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { getSingleDocument } from "../../Firebase/functions";
import { setRecipeDetails } from "../RecipeDetails/reducer";
import { alterReducer, getRecipes } from "./reducer";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { isArray } from "../../Config/checkers";
import Loader from "../../Components/Loader";
import ScreenHeader from "../../Components/ScreenHeader";
import { Col, Container, Row } from "reactstrap";
import Preferences from "./Prefernces";
function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setCategory] = useState({ id: 0 });
  const [searchText, setSearchText] = useState(null);
  const state = useSelector((state) => state);
  const handlefilter = (data = []) => {
    return searchText
      ? data.filter((e) =>
          e.recipe_name.toLowerCase().includes(searchText.toLowerCase())
        )
      : data;
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const docRef = doc(db, `users/${userId}`);
    if (event.target.value.length > 4) {
      updateDoc(docRef, {
        userJourneySearchHistory: arrayUnion(event.target.value),
      });
    }
  };
  const snapShot = handlefilter(
    selectedCategory.id == 0
      ? state.homeReducer.recipes
      : state.homeReducer.recipes.filter(
          (item) => item.category.id === selectedCategory.id
        )
  );
  const userId = state.profileReducer.userDetails.id;
  const showUserPreferences = Boolean(
    state.profileReducer.userDetails.userPreferences
  );
  const isLoading = state.homeReducer.isLoading;
  useEffect(() => {
    dispatch(alterReducer({ isLoading: true }));
    const _q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          toastController.error(Messages.error_Messages.normal);
          dispatch(alterReducer({ isLoading: false }));
          console.log("snapshot error", error);
        }
      );
      dispatch(alterReducer({ isLoading: false }));
      dispatch(getRecipes(recipe_arr));
    });
    return unsubscribe;
  }, [dispatch]);
  const handleItemClick = async (recipe) => {
    // handle single recipe item click
    const _qry = doc(db, `recipes`, recipe.id);
    const recipe_item = await getSingleDocument({ query: _qry });
    dispatch(setRecipeDetails(recipe_item));
    navigate(`${NAV_SCREENS.recipe_details}${recipe.id}`);
  };
  const isFirstLoading =
    isLoading && isArray(snapShot) && snapShot?.length === 0;
  const VerticalList = () => {
    return (
      <Container className="home-list" fluid>
        <Row>
          {snapShot.map((item, index) => {
            return (
              <Col md={6} className="home-list-item" key={index}>
                <PlayerStack
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
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  };
  return (
    <Container className="p-0" fluid>
      <ScreenHeader
        type="home"
        onCategoryChanges={(item) => setCategory(item)}
        onSearch={handleSearch}
      />
      {!showUserPreferences ? (
        <Preferences />
      ) : isFirstLoading ? (
        <Loader />
      ) : (
        <VerticalList />
      )}
    </Container>
  );
}
export default memo(Home);
