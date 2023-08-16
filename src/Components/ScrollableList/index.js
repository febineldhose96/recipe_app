import React, { memo, useMemo, useRef } from "react";
import "./styles.css";
function ScrollableList({
  data = [],
  visible = true,
  footerVisible = false,
  headerVisible = false,
  renderItem = () => <div></div>,
  listEmptyItem = () => <div></div>,
  listFooter = () => <div></div>,
  listHeader = () => <div></div>,
  listStyle = "scrll_listStyle",
  onScroll = () => {},
  onDoubleClickItem = () => {},
  isBottomReached = () => {},
}) {
  const memozedData = useMemo(() => data, [data]);
  const liRef = useRef();
  const isEmpty = useMemo(
    () => (Array.isArray(memozedData) ? memozedData.length === 0 : true),
    [memozedData]
  );
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      isBottomReached();
    }
    onScroll(e);
  };
  if (visible)
    return (
      <ul className={listStyle} onScroll={handleScroll}>
        {headerVisible && listHeader()}
        {isEmpty
          ? listEmptyItem()
          : memozedData.map((item, index) => (
              <li key={index} ref={liRef} onDoubleClick={onDoubleClickItem}>
                {renderItem({ item, index })}
              </li>
            ))}
        {footerVisible && listFooter()}
      </ul>
    );
  else return null;
}
export default memo(ScrollableList);
