import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
export default function Category(params) {
  const state = useSelector((state) => state);
  const popular_categories = state.categoryReducer.categories.filter(
    (e) => e.is_popular
  );
  const categories = state.categoryReducer.mealType;
  return (
    <div>
      <div>
        <h3>All categories</h3>
        <h3>Popular categories</h3>
        {popular_categories.map((item, index) => {
          return (
            <div key={index}>
              <p style={{ color: "white" }}>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div>
        {categories.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.image_url}
                height={30}
                width={30}
                alt={`categroy_${index}`}
              />
              <p style={{ color: "white" }}>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
