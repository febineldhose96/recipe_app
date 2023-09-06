import React, { useState } from "react";
import "./styles.css";
import ScreenHeader from "../../Components/ScreenHeader";
import { Button, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import DropDown from "../../Components/DropDown";
const MealPlanner = () => {
  const state = useSelector((state) => state);
  const [planner, setPlanner] = useState({
    ingredients: [],
    plannername: "",
    dietType: {},
  });
  const [selectedItem, setSelectedItem] = useState({});
  const categories = state.categoryReducer.mealType;
  const handleAddMeal = (item) => {
    const filtr_planner = planner.ingredients.map((e) => e.name);
    if (item) {
      setPlanner((e) => ({
        ...e,
        ingredients: e.ingredients.filter((e) => e.name !== item.name),
      }));
    } else if (!filtr_planner.includes(selectedItem?.name)) {
      setPlanner((e) => ({
        ...e,
        ingredients: [...e.ingredients, selectedItem],
      }));
    }
  };
  const prevMealPlans = [];
  return (
    <div>
      <ScreenHeader type="profile" showMealPlannerIcon={false} />
      <div
        className="p-t-header-height"
        style={{ marginLeft: 15, display: "flex", flexDirection: "column" }}
      >
        <input
          placeholder="Enter your meal plan name"
          className="meal-planner-input"
          onChange={() => {}}
        />
        <DropDown
          placeholder={"Select DietType"}
          parallelText="DietType"
          data={categories}
          dropButtonStyles="drop-down-button-style"
          id={`dropdown-variants-secondary`}
          selectedItem={planner.dietType}
          onItemClick={(p) => setPlanner((e) => ({ ...e, dietType: p }))}
        />
        <div>
          <input
            placeholder="Enter your ingredient name"
            className="meal-planner-input"
            onChange={(evnt) =>
              setSelectedItem((e) => ({ ...e, name: evnt.target.value }))
            }
          />
          <input
            placeholder="Amount with unit"
            className="meal-planner-input"
            style={{ width: 150, marginLeft: 10 }}
            onChange={(evnt) =>
              setSelectedItem((e) => ({ ...e, amount: evnt.target.value }))
            }
          />
          <Button
            color="primary"
            style={{ marginLeft: 20 }}
            onClick={() => handleAddMeal()}
          >
            Add Ingredient
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {planner.ingredients.map((item, index) => {
            return (
              <div
                sm="2"
                key={index}
                style={{
                  border: "1px solid green",
                  flexShrink: 1,
                  alignSelf: "center",
                  padding: 5,
                  borderRadius: 10,
                  gap: 10,
                  marginLeft: 10,
                }}
              >
                {item.name}
                <MdClose onClick={() => handleAddMeal(item)} />{" "}
              </div>
            );
          })}
        </div>
        <Button style={{ maxWidth: 200, marginTop: 100, marginBottom: 100 }}>
          Save Your Recipe Plan
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            gap: 10,
          }}
        >
          {planner.ingredients.slice(0, 1).map((item, index) => {
            return (
              <div key={index} className="plan-details-shower">
                <h4 className="m-0" style={{ margin: 0, paddingBottom: 10 }}>
                  Plan Name : Tomato Rice
                </h4>

                <h5>DietType : {item.name}</h5>
                <h5>Ingredients : {item.name}</h5>
                <div>
                  {planner.ingredients.map((ingredient, index) => {
                    return (
                      <div
                        sm="2"
                        key={index}
                        style={{
                          border: "1px solid green",

                          alignSelf: "center",
                          padding: 5,
                          borderRadius: 10,
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        {ingredient.name}- {ingredient.amount}
                      </div>
                    );
                  })}
                </div>
                <Button style={{ marginTop: 20 }}>Done</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
