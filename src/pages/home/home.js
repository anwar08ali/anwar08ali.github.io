import React, { useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

import ImageSearch from "../../components/ImageSearch/ImageSearch";
import { getData } from "./getData";
import styles from "./home.module.css";
import { rowTemplate } from "./rowTemplate";
import { SETTINGS } from "./settings";
import ViewScroller from "./ViewScroller";

// export const getData = function (offset, limit) {
//   let res = [];
//   let start = Math.max(SETTINGS.minIndex, offset);
//   let end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
//   for (let i = start; i <= end; i++) {
//     res.push({
//       index: i,
//       text: `table data ${i}`,
//     });
//   }
//   return res;
// };
// export const rowTemplate = (item) => {
//   return item;
// };
const Home = (props) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("Hello");
  useEffect(() => {
    // console.log("update");
  });
  useEffect(() => {
    // console.log("did mount");
  }, []);
  useEffect(() => {
    // console.log("update b");
  }, [a, b]);
  const ren = () => {
    // console.log("render");
  };

  return (
    <>
      <header>
        <div className={styles.heading}>Image Search App</div>
      </header>
      <ErrorBoundary>
        <ViewScroller settings={SETTINGS} get={getData} row={rowTemplate} />
        {/* <ImageSearch /> */}
      </ErrorBoundary>
    </>
  );
};

export default Home;
