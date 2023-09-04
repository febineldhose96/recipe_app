import React, { memo, useEffect, useMemo, useState } from "react";
import "./styles.css";
import {
  collection,
  onSnapshot,
  query,
  where,
  documentId,
  updateDoc,
  arrayRemove,
  doc,
} from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "../../Config/messages";
import { getSavedRecipes } from "./reducer";
import VideoPlayer from "../../Components/VideoPlayer";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChangeUserDetails } from "../Profile/reducer";
import { getSingleDocument } from "../../Firebase/functions";
import { setRecipeDetails } from "../RecipeDetails/reducer";
import { NAV_SCREENS } from "../../Navigations/config";
import { useNavigate } from "react-router-dom";
import { Container, List, Col, Row, InputGroup, Input } from "reactstrap";

function SavedRecipes() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);
  const userId = state.profileReducer.userDetails.id;
  const savedrecipeIDs = useMemo(
    () =>
      state.profileReducer.userDetails.saved_recipes?.length > 0
        ? state.profileReducer.userDetails.saved_recipes
        : ["123"],
    [state.profileReducer.userDetails.saved_recipes]
  );
  const handlefilter = (data = []) => {
    return searchText
      ? data.filter((e) =>
          e.recipe_name.toLowerCase().includes(searchText.toLowerCase())
        )
      : data;
  };
  const snapShot = handlefilter(state.savedRecipesReducer.recipes);
  const isEmpty = Array.isArray(snapShot) ? snapShot.length === 0 : true;

  useEffect(() => {
    const _q = query(
      collection(db, "recipes"),
      where(documentId(), "in", savedrecipeIDs)
    );

    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          toastController.error(Messages.error_Messages.normal);
          console.log("snapshot error", error);
        }
      );
      dispatch(getSavedRecipes(recipe_arr));
    });
    return unsubscribe;
  }, [dispatch, savedrecipeIDs]);

  const handleRemove = (id) => {
    const options = id;
    const docRef = doc(db, `users/${userId}`);
    updateDoc(docRef, { saved_recipes: arrayRemove(options) })
      .then((e) => {
        dispatch(ChangeUserDetails());
        toastController.success(Messages.success_Messages.recipe_removed);
      })
      .catch((e) => {
        toastController.error(Messages.error_Messages.normal);
        console.log("saving recipe erorr", e);
      });
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleItemClick = async (recipe) => {
    // handle single recipe item click
    const _qry = doc(db, `recipes`, recipe.id);
    const recipe_item = await getSingleDocument({ query: _qry });
    dispatch(setRecipeDetails(recipe_item));
    navigate(`${NAV_SCREENS.recipe_details}${recipe.id}`);
  };
  return (
    <div style={{ paddingLeft: 20 }}>
      <h3 style={{ marginTop: 20, color: "green", fontWeight: "bold" }}>
        Your Saved Recipes
      </h3>
      <Col sm={6} className="sh-search-wrapper" style={{ marginTop: 20 }}>
        <InputGroup>
          <Input
            placeholder="Search saved recipes..."
            className="sh-search-input"
            onChange={handleSearch}
          />
          <FaSearch className="sh-search-icon" />
        </InputGroup>
      </Col>
      <Col>
        <div className="sr_player_stack" style={{ gap: 15 }}>
          {isEmpty ? (
            <div style={{ color: "green", marginTop: 200, marginLeft: 200 }}>
              You have no saved recipes
            </div>
          ) : (
            snapShot.map((item, index) => {
              return (
                <div key={index}>
                  <video
                    src={item.video_urls[0]}
                    loop
                    autoPlay={false}
                    mainclassStyle="sr_player_video"
                    playerStyle="sr_player_video_style"
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                    onCanPlay={(e) => e.target.pause()}
                    onClick={() => handleItemClick(item)}
                    style={{
                      height: 200,
                      width: 200,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                  <Row style={{ marginTop: 10 }}>
                    <Col sm={10}>
                      <h4 style={{ color: "green" }}>{item.recipe_name}</h4>
                    </Col>
                    <Col sm={2}>
                      <MdDelete
                        style={{ fontSize: 20 }}
                        onClick={() => handleRemove(item.id)}
                      />
                    </Col>
                  </Row>
                </div>
              );
            })
          )}
        </div>
      </Col>
    </div>
  );
}

export default memo(SavedRecipes);
