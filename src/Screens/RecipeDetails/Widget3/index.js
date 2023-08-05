import React from "react";
import "./styles.css";
export default function Widget3({
  nutrients = [
    { name: "Calories", amount: 228.9, unit: "kcal" },
    { name: "Total Fat", amount: 17.19, unit: "grams" },
    { name: "carbs", amount: 8.19, unit: "grams" },
    { name: "carbs", amount: 8.19, unit: "grams" },
  ],
}) {
  return (
    <div className="dt_w3_main">
      <h3 className="dt_w3_head_txt">Nutrition Per serving</h3>
      <div className="dt_w3_table">
        {nutrients.map((nutrient, index) => {
          return (
            <div
              className={
                index % 2 === 0
                  ? "dt_w3_tableinnerview"
                  : "dt_w3_tableinnerview_active"
              }
            >
              <div className="dt_w3_nutrientName">{nutrient.name}</div>
              <div className="dt_w3_nutrientamount">
                {nutrient.amount + " " + nutrientUnit(nutrient.unit)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const nutrientUnit = (unit) => {
  switch (unit) {
    case "grams":
      return "g";
    default:
      return unit;
  }
};
