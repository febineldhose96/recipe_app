import React, { useEffect, useState } from "react";
import "./styles.css";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdFoodBank } from "react-icons/md";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
export default function Widget2({
  ingredients = [],
  number_of_portions = 1,
  instructions = [],
}) {
  const [serving, setServing] = useState(1);
  const nwInstructions = [...instructions, { text: "Serve and enjoy!" }];
  useEffect(() => {
    setServing(number_of_portions);
  }, [number_of_portions]);
  const handleServing = (type) => {
    if (type === "add") {
      setServing((ser) => ser + 1);
    } else if (type === "sub" && serving > 1) {
      setServing((ser) => ser - 1);
    }
  };

  return (
    <div className="dt_w2_main">
      <h3 className="dt_w2_ingrednts_txt">Ingredients</h3>
      <div className="dt_w2_wrapper_1">
        <AiOutlineMinusCircle
          className={
            serving > 1
              ? "dt_w2_add_sub_butn_active"
              : "dt_w2_add_sub_butn_inactive"
          }
          onClick={() => handleServing("sub")}
        />
        {serving} Servings
        <AiOutlinePlusCircle
          className={"dt_w2_add_sub_butn_active"}
          onClick={() => handleServing("add")}
        />
      </div>
      <div className="dt_w2_wrapper_2">
        {ingredients.map((ingredient, index) => {
          const i_name = String(ingredient.text).replace(
            number_of_portions,
            ""
          );
          return (
            <div key={index} className="dt_w2_ingredints_wrapper">
              <MdFoodBank className="dt_w2_icon1" />
              <span className="dt_w2_ingrednt_name_txt">
                {serving * ingredient?.amount ?? 0}
              </span>
              {i_name}
            </div>
          );
        })}
      </div>
      <h3 className="dt_w2_ingrednts_txt">Instructions</h3>
      <div className="dt_w2_wrapper_3">
        {nwInstructions.map((ingredient, index) => {
          const i_name = String(ingredient.text);
          return (
            <div key={index} className="dt_w2_instruction_wrapper">
              <p className="dt_w2_instruction_step_txt">Step {index + 1}</p>
              <BsFillHandIndexThumbFill className="dt_w2_instruction_icon_1" />{" "}
              {i_name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
