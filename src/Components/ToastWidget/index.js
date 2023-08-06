import React, { memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastController = toast;
function ToastWidget({ hideProgressBar = true, ...props }) {
  return (
    <ToastContainer
      position="top-center"
      newestOnTop={true}
      autoClose={3000}
      closeOnClick
      pauseOnFocusLoss
      hideProgressBar={hideProgressBar}
    />
  );
}

export default memo(ToastWidget);
export { toastController };
