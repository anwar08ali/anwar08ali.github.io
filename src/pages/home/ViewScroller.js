import React, { useEffect, useRef, useState } from "react";
const setInitVal = function (settings, get) {
  const { minIndex, maxIndex, startIndex, numOfRows, rowsHeight, virtualRows } =
    settings;

  const viewPortHeight = numOfRows * rowsHeight;
  const totalHeight = (maxIndex - minIndex + 1) * rowsHeight;
  const virtualRowsHeight = virtualRows * rowsHeight;
  const bufferedItemsHeight = viewPortHeight + 2 * virtualRowsHeight;
  const bufferedItems = numOfRows + 2 * virtualRows;
  const itemsAbove = startIndex - virtualRows - minIndex;
  const paddingTopHeight = itemsAbove * rowsHeight;
  const paddingBottomHeight = totalHeight - paddingTopHeight;

  const data = [];

  return {
    viewPortHeight,
    totalHeight,
    virtualRowsHeight,
    bufferedItemsHeight,
    bufferedItems,
    paddingTopHeight,
    paddingBottomHeight,
    data,
  };
};
const ViewScroller = (props) => {
  const { settings, get, row } = props;
  const { minIndex, maxIndex, startIndex, numOfRows, rowsHeight, virtualRows } =
    settings;
  const initValues = setInitVal(settings, get);
  const [state, setState] = useState(initValues);
  const {
    data,
    viewPortHeight,
    paddingTopHeight,
    paddingBottomHeight,
    bufferedItems,
    totalHeight,
    virtualRowsHeight,
  } = state;
  const virtualScrollRef = useRef();
  const handleScroll = ({ target: { scrollTop } }) => {
    const index = Math.abs(
      minIndex + Math.floor((scrollTop - virtualRowsHeight) / rowsHeight)
    );
    const d = get(index, bufferedItems);
    const tPadHeight = Math.max((index - minIndex) * rowsHeight, 0);
    const bottomPadHeight = Math.max(
      totalHeight - tPadHeight - d.length * rowsHeight,
      0
    );
    setState({
      ...state,
      data: d,
      paddingTopHeight: tPadHeight,
      paddingBottomHeight: bottomPadHeight,
    });
  };
  useEffect(() => {
    handleScroll({ target: { scrollTop: 0 } });
  }, []);
  return (
    <div
      className="view-port"
      style={{ height: `${viewPortHeight}px`, overflowY: "auto" }}
      ref={virtualScrollRef}
      onScroll={handleScroll}
    >
      <div
        className="paddingTopHeight"
        style={{ height: `${paddingTopHeight}px` }}
      ></div>
      {data.map((rowItem) => {
        return <div key={rowItem.index}>{row(rowItem)}</div>;
      })}
      <div
        className="paddingBottomHeight"
        style={{ height: `${paddingBottomHeight}px` }}
      ></div>
    </div>
  );
};

export default ViewScroller;
