import React, { useCallback, useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import "./styles.css";
export default function FileContainer({
  show = true,
  type = "img",
  multipleFile = false,
  files = [],
  onFilePick = (val) => {},
}) {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const filePick = async (event) => {
    const _file = event?.target?.files[0];
    if (event?.target?.files[0]) {
      var url = URL.createObjectURL(_file);
      _changeFileVal(url);
      onFilePick(_file);
    } else {
    }
  };
  const _changeFileVal = useCallback(
    (val) => {
      setFile(val);
      fileRef.current.value = null;
    },
    [setFile]
  );
  if (show)
    return (
      <div className="fileContainer">
        <input
          type="file"
          accept={type === "img" ? "image/*" : "video/*"}
          ref={fileRef}
          multiple={multipleFile}
          style={{ display: "none" }}
          onChange={filePick}
        />

        {file ? (
          <div className="file-wrapper-container">
            {type === "img" ? (
              <img src={file} className="file-img" alt="file-img" />
            ) : (
              <video src={file} controls className="video-container" />
            )}
            <div
              className="detete-button-wrapper"
              onClick={() => _changeFileVal(null)}
            >
              <AiOutlineDelete />
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current.click()}
            className="file-wrapper-container"
          >
            <AiOutlineCamera />
            <span>{type === "img" ? "add photos" : "add recipe video"}</span>
          </div>
        )}
      </div>
    );
  else return null;
}
