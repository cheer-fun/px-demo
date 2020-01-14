import React, { useState, useEffect } from "react";
import { input as doc } from "../assets/doc/common.yml";

function useAnimate(callback) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    let timer;
    if (animate) {
      callback();
      timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [animate]);

  return [animate, setAnimate];
}

export default function IconBtn({ iconName="", btnClass = "", callback = () => {} }) {
  const animateName = "rubberBand animated";
  const [animate, setAnimate] = useAnimate(callback);

  return (
    <button
      onClick={() => setAnimate(true)}
      className={`${btnClass} ${animate ? animateName : ""}`}
    >
      <i className={"px-icon icon-" + iconName} />
    </button>
  );
};
