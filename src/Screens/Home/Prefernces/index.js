import React, { useState } from "react";
import { Container } from "reactstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import { ChangeUserDetails } from "../../Profile/reducer";
import { toastController } from "../../../Components/ToastWidget";
import { Messages } from "../../../Config/messages";
function Preferences({ show = true }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const categories = state.categoryReducer.categories;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const userId = state.profileReducer.userDetails.id;
  const handleItem = (item) => {
    if (selectedCategory.includes(item.id)) {
      setSelectedCategory([...selectedCategory].filter((e) => e !== item.id));
    } else {
      setSelectedCategory([...selectedCategory, item.id]);
    }
  };
  const handleClickGo = () => {
    const docRef = doc(db, `users/${userId}`);
    updateDoc(docRef, { userPreferences: selectedCategory }).then(() => {
      dispatch(ChangeUserDetails());
      toastController.success(Messages.success_Messages.selection_text);
    });
  };
  return (
    <Container className="p-t-header-height">
      <div className="row-container-with-gap">
        {categories.map((item, index) => {
          const isActive = selectedCategory.includes(item.id);
          return (
            <button
              key={index}
              className={
                isActive ? "br-green-active-button" : "br-green-button"
              }
              onClick={() => handleItem(item)}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <button className="go-button" onClick={handleClickGo}>
        Go
      </button>
    </Container>
  );
}
export default Preferences;
