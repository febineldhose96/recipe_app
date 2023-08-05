import React, { useCallback, useState } from "react";
import "./styles.css";
import FileContainer from "./FileContainer";
import InputStack from "./InputStack";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase/config";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
export default function UploadRecipe(params) {
  const state = useSelector((state) => state);
  const userId = state.profileReducer.userDetails.userId;
  const username = state.profileReducer.userDetails.username;
  const [isLoading, setloading] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [data, setData] = useState({
    recipe_name: "",
    recipe_description: "",
    recipe_ingredients: "",
    recipe_instructions: "",
    recipe_number_of_portions: 1,
    recipe_preptime_hrs: 0,
    recipe_pretime_mnts: 0,
    recipe_cooktime_hrs: 0,
    recipe_cooktime_mnts: 0,
  });
  const handleInputs = useCallback(
    (type, evnt) => {
      const text = evnt?.target?.value ?? evnt;
      setData((e) => ({ ...e, [type]: text }));
    },
    [setData]
  );
  const filePick = useCallback(
    (file, type) => {
      if (type === "img") {
        setImages((e) => [...e, file]);
      } else {
        setVideo((e) => [...e, file]);
      }
    },
    [setImages, setVideo]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const imageRef = ref(storage, `recipe-thumbnails/${Date.now()}`);
      const videoRef = ref(storage, `recipe-videos/${Date.now()}`);
      const uploadFile = async (_ref, arr, type) => {
        return Promise.all(
          arr.map(async (_file) => {
            const url = await uploadBytes(_ref, _file).then(async (res) => {
              const url = await getDownloadURL(_ref).then((url) => url);
              return url;
            });
            return url;
          })
        );
      };
      const video_urls = await uploadFile(videoRef, video, "video_urls");
      const image_urls = await uploadFile(imageRef, images, "image_urls");
      addDoc(collection(db, "recipes"), {
        ...data,
        recipe_number_of_portions: Number(data.recipe_number_of_portions),
        video_urls,
        image_urls,
        favourites: [],
        userId,
        username,
        createdOn: new Date().getTime(),
      }).then((res) => {
        setloading(false);
      });
    } catch (error) {
      alert("file", error);
      setloading(false);
    }
  };
  if (isLoading) return <Loader />;
  else
    return (
      <div className="upload_recipe">
        <div className="main-container">
          <div className="container-wrapper">
            <form onSubmit={handleSubmit}>
              <h4 className="plain-text1">Title</h4>
              <input
                type="text"
                placeholder="Give your recipe name"
                className="recipe-name-input"
                onChange={(e) => handleInputs("recipe_name", e)}
                required
              />
              <FileContainer
                onFilePick={(f) => filePick(f, "img")}
                multipleFile={true}
                files={images}
              />
              <FileContainer type="video" onFilePick={filePick} />
              <h4 className="plain-text1">Description</h4>
              <textarea
                placeholder="Introduce your recipe,add notes,cooking tips,serving suggestions etc..."
                className="description-input"
                onChange={(e) => handleInputs("recipe_description", e)}
              />
              <InputStack
                headerName="Ingredients"
                type="ingredients"
                placeholder="Add one or paste multiple items"
                onChange={(e) => handleInputs("recipe_ingredients", e)}
              />
              <InputStack
                headerName="Instructions"
                placeholder="Add your steps here..."
                onChange={(e) => handleInputs("recipe_instructions", e)}
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
                  onChange={(e) => handleInputs("recipe_number_of_portions", e)}
                />
              </div>

              {/*............... */}
              {/* Prep section */}
              <h4 className="plain-text1">Prep Time</h4>
              <label className="label-serve">
                How long does it take to prepare this recipe?
              </label>
              <div className="row-container">
                <input
                  placeholder="Hours"
                  className="time-input"
                  maxLength={3}
                  onChange={(e) => handleInputs("recipe_preptime_hrs", e)}
                />
                <input
                  placeholder="Minitues"
                  className="time-input"
                  onChange={(e) => handleInputs("recipe_pretime_mnts", e)}
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
                <input
                  placeholder="Hours"
                  className="time-input"
                  maxLength={3}
                  onChange={(e) => handleInputs("recipe_cooktime_hrs", e)}
                />
                <input
                  placeholder="Minitues"
                  className="time-input"
                  maxLength={2}
                  onChange={(e) => handleInputs("recipe_cooktime_mnts", e)}
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
