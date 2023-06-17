import React, { useCallback, useState } from "react";
import "./styles.css";
export default function InputStack({
  show = true,
  placeholder = "",
  headerName = "",
  onChange = (array) => {},
}) {
  const [stack, setStack] = useState([{ text: "" }]);
  const _inputchange = useCallback(
    (evnt, index) => {
      const text = evnt.target.value;
      if (stack.length > 0) {
        const nw = [...stack];
        nw[index].text = text;
        if (String(text).length > 0 && !nw.some((e) => e.text === "")) {
          setStack([...nw, { text: "" }]);
        } else {
          setStack(nw);
        }
      }
    },
    [stack, setStack]
  );
  const _onBlur = useCallback(
    (evnt) => {
      if (evnt.target.value.length === 0) {
        const _ftrVal = stack.filter((e) => e.text.length > 0);
        setStack([..._ftrVal, { text: "" }]);
      }
      onChange(stack);
    },
    [stack, setStack, onChange]
  );
  if (show)
    return (
      <div className="inputstack">
        <h4 className="plain-text1">{headerName}</h4>
        {stack.map((val, i) => {
          return (
            <input
              key={i}
              placeholder={placeholder}
              type="search"
              className="input1"
              value={val.text}
              onBlur={_onBlur}
              onChange={(evnt) => _inputchange(evnt, i)}
            />
          );
        })}
      </div>
    );
  else return null;
}
