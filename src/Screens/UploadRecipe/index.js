import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./styles.css";
import FileContainer from "./FileContainer";
import InputStack from "./InputStack";
export default function UploadRecipe(params) {
  return (
    <div className="upload_recipe">
      <div className="main-container">
        <AiOutlineArrowLeft />
        <div className="container-wrapper">
          <form>
            <h4 className="plain-text1">Title</h4>
            <input
              type="text"
              placeholder="Give your recipe name"
              className="recipe-name-input"
              required
            />
            <FileContainer />
            <FileContainer type="video" />
            <h4 className="plain-text1">Description</h4>
            <textarea
              placeholder="Introduce your recipe,add notes,cooking tips,serving suggestions etc..."
              className="description-input"
            />
            <InputStack
              headerName="Ingredients"
              placeholder="Add one or paste multiple items"
              onChange={(a) => {
                console.log(a);
              }}
            />
            <InputStack
              headerName="Instructions"
              placeholder="Add your steps here..."
              onChange={(a) => {
                console.log(a);
              }}
            />
            {/* Serving section */}
            <h4 className="plain-text1">Servings</h4>
            <label className="label-serve">
              How many portions does this recipe make?
            </label>
            <div>
              <input
                placeholder="#"
                className="serve-input"
                required
                type="text"
              />
            </div>

            {/*............... */}
            {/* Prep section */}
            <h4 className="plain-text1">Prep Time</h4>
            <label className="label-serve">
              How long does it take to prepare this recipe?
            </label>
            <div className="row-container">
              <input placeholder="Hours" className="time-input" maxLength={3} />
              <input
                placeholder="Minitues"
                className="time-input"
                maxLength={2}
              />
            </div>
            {/*............... */}
            {/* Cook Time section */}
            <h4 className="plain-text1">Cooking Time</h4>
            <label className="label-serve">
              How long does it take to cook this recipe?
            </label>
            <div className="row-container">
              <input placeholder="Hours" className="time-input" maxLength={3} />
              <input
                placeholder="Minitues"
                className="time-input"
                maxLength={2}
              />
            </div>
            {/*............... */}
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
