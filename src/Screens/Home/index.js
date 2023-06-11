import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAPI, apis } from "../../Network";

import { callsomeapi } from "./reducer";

export default function Home(props) {
  const state = useSelector((state) => state.HomeReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchNew = async () => {
    const result = await fetchAPI({ url: apis.food });
    dispatch(callsomeapi(result));
  };
  return (
    <div>
      <title>hi</title>
      <h1>Hi welcome to Home Page {state.value}</h1>
      {state.newVal?.map((e) => (
        <img src={e.image} />
      ))}
      <button onClick={fetchNew}>Press</button>
      <button
        onClick={() => {
          navigate("/details");
        }}
      >
        navigate
      </button>
    </div>
  );
}
