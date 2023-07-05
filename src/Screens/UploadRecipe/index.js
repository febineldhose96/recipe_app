import React, { useCallback, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./styles.css";
import FileContainer from "./FileContainer";
import InputStack from "./InputStack";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase/config";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../Components/Loader";
export default function UploadRecipe(params) {
  const [isLoading, setloading] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [data, setData] = useState({
    recipe_name: "",
    recipe_description: "",
    recipe_ingredients: "",
    recipe_instructions: "",
    recipe_number_of_portions: "",
    recipe_preptime_hrs: 0,
    recipe_pretime_mnts: 0,
    recipe_cooktime_hrs: 0,
    recipe_cooktime_mnts: 0,
    video_urls: [],
    image_urls: [],
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
        arr.map((_file) =>
          uploadBytes(_ref, _file).then(async (res) => {
            getDownloadURL(_ref).then((url) => {
              const nURL = data[type];
              setData((e) => ({ ...e, [type]: [...nURL, url] }));
            });
          })
        );
      };
      await uploadFile(imageRef, images, "image_urls");
      await uploadFile(videoRef, video, "video_urls");
      addDoc(collection(db, "recipes"), { ...data }).then((e) => {
        setloading(false);
      });
    } catch (error) {
      alert("file", error);
      setloading(false);
    }
  };
  return (
    <div className="upload_recipe">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-container">
          <AiOutlineArrowLeft />
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
              <FileContainer onFilePick={(f) => filePick(f, "img")} />
              <FileContainer type="video" onFilePick={filePick} />
              <h4 className="plain-text1">Description</h4>
              <textarea
                placeholder="Introduce your recipe,add notes,cooking tips,serving suggestions etc..."
                className="description-input"
                onChange={(e) => handleInputs("recipe_description", e)}
              />
              <InputStack
                headerName="Ingredients"
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
      )}
    </div>
  );
}
