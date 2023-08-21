import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { isArray } from "../../Config/checkers";
import "./styles.css";
export default function Droplist({
  show = true,
  data = [],
  id = "dropdown-basic",
  dropButtonStyles = {},
  onItemClick = () => {},
  selectedItem = {},
  placeholder = selectedItem.value ?? "",
  parallelText = "",
}) {
  const isEmpty = isArray(data) && data.length === 0;
  if (show)
    return (
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id={id} className={dropButtonStyles} variant="none">
          {selectedItem.name
            ? parallelText
              ? `${parallelText} : ${selectedItem.name}`
              : selectedItem.name
            : placeholder}
        </Dropdown.Toggle>
        <Dropdown.Menu className="_dr_menuStyles">
          {isEmpty ? (
            <Dropdown.Item>No Data Available</Dropdown.Item>
          ) : (
            data.map((item, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => !isEmpty && onItemClick(item)}
                >
                  {item.name}
                </Dropdown.Item>
              );
            })
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  else return null;
}
