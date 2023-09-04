import React, { useEffect, useMemo, useRef, useState } from "react";
import { auth, db, storage } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUserDetails, onLogout } from "./reducer";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import "./styles.css";
import ScreenHeader from "../../Components/ScreenHeader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  arrayRemove,
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Row, Button } from "reactstrap";
import { Col } from "react-bootstrap";
import { getSavedRecipes } from "../SavedRecipes/reducer";
import { setRecipeDetails } from "../RecipeDetails/reducer";
import { getSingleDocument } from "../../Firebase/functions";
import { MdDelete } from "react-icons/md";
function Profile() {
  const state = useSelector((state) => state);
  const [selectedTab, setSelectedTab] = useState("myrecipes");
  const userId = state.profileReducer.userDetails.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();
  const savedrecipeIDs = useMemo(
    () =>
      state.profileReducer.userDetails.saved_recipes?.length > 0
        ? state.profileReducer.userDetails.saved_recipes
        : ["123"],
    [state.profileReducer.userDetails.saved_recipes]
  );
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
  const onEditProfile = async (type, event) => {
    const imageRef = ref(storage, `recipe-thumbnails/${Date.now()}`);
    const docRef = doc(db, `users/${userId}`);
    if (type === "picked") {
      const _file = event?.target?.files[0];
      if (event?.target?.files[0]) {
        var url = URL.createObjectURL(_file);
        uploadBytes(imageRef, _file).then(async (_) => {
          const url = await getDownloadURL(imageRef).then((url) => url);
          updateDoc(docRef, { profile_imageUrl: url }).then((e) => {
            toastController.success(Messages.success_Messages.prof_img);
            dispatch(ChangeUserDetails());
          });
        });
      }
    } else {
      fileRef.current.click();
    }
  };
  const isSelected = selectedTab === "myrecipes";
  const snapShot = isSelected
    ? state.savedRecipesReducer.recipes
    : state.savedRecipesReducer.recipes;
  const isEmpty = Array.isArray(snapShot) ? snapShot.length === 0 : true;

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
  const handleItemClick = async (recipe) => {
    // handle single recipe item click
    const _qry = doc(db, `recipes`, recipe.id);
    const recipe_item = await getSingleDocument({ query: _qry });
    dispatch(setRecipeDetails(recipe_item));
    navigate(`${NAV_SCREENS.recipe_details}${recipe.id}`);
  };
  return (
    <div>
      <ScreenHeader type="profile" onEditProfile={onEditProfile} />
      <input
        type="file"
        accept={"image/*"}
        ref={fileRef}
        style={{ display: "none" }}
        onChange={(e) => onEditProfile("picked", e)}
      />
      <div
        sm={10}
        style={{
          paddingTop: 170,
          display: "flex",
          flexDirection: "row",
          marginLeft: 40,
        }}
      >
        <Button
          style={{
            color: "white",
            backgroundColor: isSelected ? "green" : "grey",
            border: "none",
            borderRadius: 5,
            marginInline: 10,
            marginTop: 20,
          }}
          onClick={() => setSelectedTab("myrecipes")}
        >
          My recipes
        </Button>
        <Button
          style={{
            color: "white",
            backgroundColor: !isSelected ? "green" : "grey",
            border: "none",
            borderRadius: 5,
            marginInline: 10,
            marginTop: 20,
          }}
          onClick={() => setSelectedTab("saved")}
        >
          Saved recipes
        </Button>
      </div>
      <Col style={{ marginLeft: 40 }}>
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

export default Profile;
