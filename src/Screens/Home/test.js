import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/config";

export default function TestPage(params) {
  const [ingredinets, setIngredents] = useState([]);
  const data = {
    image_url:
      "https://www.allrecipes.com/thmb/pTGS0SZsSQK85sV_RQE_K6ZfoN4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/26460-quick-and-easy-chicken-noodle-soup-allrecipes-1x1-1-b88125437574471db3e114c40bc6928e.jpg",
    is_popular: false,
    name: "Smoothie",
    visitCount: 0,
    cuisineType: false,
    mealType: true,
    dietType: false,
  };
  const adddata = () => {
    addDoc(collection(db, "categories"), data).then((res) => {
      // alert(res);
    });
  };
  useEffect(() => {
    const _q = query(
      collection(db, "categories"),
      where("mealType", "==", true)
    );
    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          console.log("snapshot error", error);
        }
      );
      setIngredents(recipe_arr);
    });
    return unsubscribe;
  }, []);
  return (
    <div
      style={{
        backgroundColor: "red",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <button onClick={adddata}>Click</button>
      {ingredinets.map((e, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              alert(e.name);
            }}
          >
            {e.name}
            {/* <img
              height={100}
              width={100}
              src={e.image_url}
              style={{ objectFit: "contain" }}
            /> */}
          </div>
        );
      })}
    </div>
  );
}
