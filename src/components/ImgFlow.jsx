import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Pic from "./Pic";
import { useWindowSize, useScroll } from "../util";

import { IMG_PREFIX } from "../assets/config/index.yml";
import { PUBLIC_PATH } from "../assets/config/index.yml";

const PREVIEW_WIDTH = 160;
const MAX_WIDTH = 350;
const PADDING = 12;

const COLOR_LIST = [
  "#5A0514",
  "#255273",

  "#1A2E40",
  "#011C26",
  "#BF8C80",
  "#8C6C6C",

  "#5B5778",
  "#A3A2B0",

  "#594251",
  "#3F4D59",
  "#728C85",
  "#CAD9A9",

  "#024059",
  "#012E40",
  "#025E73",
  "#78B2BF",
  "#037F8C",

  "#70596C",
  "#B08CAA",
  "#D7ABCF",
  "#430633",
  "#2E0423",
  "#700045",
  "#690950"
];

let last = 0;
function randomColor() {
  last =
    (last + Math.round(Math.random() * COLOR_LIST.length / 2 + 1)) % COLOR_LIST.length;
  return COLOR_LIST[last];
}

function useCommonWidth() {
  let [count, setCount] = useState(1);
  let [commonWidth, setCommonWidth] = useState(0);
  let size = useWindowSize();
  useEffect(() => {
    const { width } = size;
    const newCount = Math.ceil(width / MAX_WIDTH);
    const newWidth = (width - 2 * PADDING) / newCount;
    setCount(newCount);
    setCommonWidth(newWidth.toFixed(2));
  }, [size]);
  return [commonWidth, count];
}

function imgFormat(info, commonWidth, [tslx, tsly]) {
  const { id, width, height, imageUrls } = info;
  const newHeight = Math.round((height * commonWidth) / width);
  const backgroundColor = randomColor();
  const style = {
    transform: `translate(${tslx}px, ${tsly}px)`,
    width: `${commonWidth}px`,
    height: `${newHeight}px`
  };
  return {
    src: `${IMG_PREFIX}${imageUrls[0].medium}`,
    style,
    tsly,
    backgroundColor,
    height: newHeight,
    len: imageUrls.length,
    url: `${PUBLIC_PATH}/detail?pid=${id}`
  };
}

function useFlow(pics) {
  let [markLen, setMarkLen] = useState(0);
  let [list, setList] = useState([]);
  let [totalHeight, setTotalHeight] = useState(0);
  let [commonWidth, count] = useCommonWidth();
  let [heightArr, setHeightArr] = useState([]);
  let [,,, scrollTop, vh] = useScroll();


  function reset() {
    const newArr = [];
    while (count--) {
      newArr.push(0);
    }
    setHeightArr(newArr);
    setList([]);
    setMarkLen(0);
  }
  
  useEffect(() => {
    reset();
  }, [commonWidth]);

  function getIdx(arr) {
    if (arr.length === 0) return 0;
    let shortIdx = 0;
    let tallIdx = 0;
    arr.forEach((e, idx) => {
      if (e < arr[shortIdx]) {
        shortIdx = idx;
      } else if (e > arr[tallIdx]) {
        tallIdx = idx;
      }
    });
    return [shortIdx, tallIdx];
  }

  useEffect(() => {
    if (pics.length === markLen) {
      return;
    } else if (pics.length === 0){
      reset();
      return;
    }
    let newList = [...list];
    let newArr = [...heightArr];

    if (pics.length > markLen) {
      const newSlice = pics.slice(markLen);
      newSlice.forEach(info => {
        const [idx] = getIdx(newArr);
        const tsl = [idx * commonWidth, newArr[idx]];
        const img = imgFormat(info, commonWidth, tsl);
        newList.push(img);
        newArr[idx] += img.height + PADDING;
      });
      const [_,tallIdx] = getIdx(newArr);
      setTotalHeight(newArr[tallIdx]);
      setList(newList);
      setHeightArr(newArr);
      setMarkLen(pics.length);
    }
  }, [pics, markLen]);

  return [list, totalHeight];
}

export default function ImgFlow({ pics }) {
  let [,,, scrollTop, vh] = useScroll(0);
  const [top, setTop] = useState(0);
  const [list, height] = useFlow(pics);

  const imgRef = useCallback(node => {
    if (node !== null) {
      setTop(node.getBoundingClientRect().height);
    }
  }, []);

  
  return (
    <div ref={imgRef} className="px-img-flow" style={{height}}>
      {list.map((img, idx) => (
        <Preview key={idx} {...{...img, scrollTop, vh, top}} />
      ))}
    </div>
  );
}


function Preview({ src, backgroundColor, style, len, url, tsly, scrollTop, vh, top}) {
  let [opacity, setOpacity] = useState(0);

  if (tsly + top < scrollTop + 2 * vh && tsly + top > scrollTop - vh) {
    return (
      <Link className="px-preview__wrapper" to={url} style={style}>
        <div className="px-preview" style={{ backgroundColor }}>
          <img src={src} style={{opacity}} onLoad={() => setOpacity(1)} />
          {len > 1 && (
            <div className="px-preview__count">
              <i className="px-icon icon-pages" />
              <span>{len}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }
  return "";
}
