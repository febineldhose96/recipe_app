import React, { memo, useMemo } from "react";
import "./styles.css";
import { ListGroup } from "reactstrap";
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
}) {
  const memozedData = useMemo(() => data, [data]);
  const isEmpty = useMemo(
    () => (Array.isArray(memozedData) ? memozedData.length === 0 : true),
    [memozedData]
  );
  if (visible)
    return (
      <ListGroup className={listStyle} onScroll={onScroll}>
        {headerVisible && listHeader()}
        {isEmpty
          ? listEmptyItem()
          : memozedData.map((item, index) => renderItem({ item, index }))}
        {footerVisible && listFooter()}
      </ListGroup>
    );
  else return null;
}
export default memo(ScrollableList);
