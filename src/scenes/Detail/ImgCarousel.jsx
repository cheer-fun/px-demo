import React, { useState, useEffect} from "react";

import Pic from  "../../components/Pic";

export default function ImgCarousel({imgArr, style}) {
  let [duration, tsx, activeIdx] = useDrag(imgArr);
  let [pag, setPag] = useState();
  let [opacity, setOpacity] = useOpacity();
  
  useEffect(() => {
    setPag([activeIdx + 1, imgArr.length].join(" / "));
    setOpacity(1);
  }, [imgArr, activeIdx]);
  
  return (
    <div className="px-detail-imgs__container">
      <div
        className="px-detail-imgs"
        style={{
          ...style,
          transitionDuration: `${duration}ms`,
          transform: `translate3d(${tsx}px, 0, 0)`
        }}
      >
        {imgArr.map((img, idx) => (
          <div key={idx} className="px-detail-imgs-item">
            <Pic src={img} />
          </div>
        ))}
      </div>
      {imgArr.length > 1 && (<p style={{opacity}} className="px-detail-imgs__pagination">{pag}</p>)}
    </div>
  );
}

function useOpacity(duration=3000) {
  let [opacity, setOpacity] = useState(0);
  let timer;
  useEffect(() => {
    if (opacity) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setOpacity(0);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [opacity]);
  return [opacity, setOpacity];
}

function useDrag(imgArr, callback) {
  let [duration, setDuration] = useState(0);
  let [activeIdx, setActiveIdx] = useState(0);
  let [tsx, setTsx] = useState(0);
  const vw = window.innerWidth;

  useEffect(() => {
    setActiveIdx(0);
  }, [imgArr]);

  useEffect(() => {
    setDuration(300);
    setTsx(-activeIdx * vw);
    const timer = setTimeout(() => {
      setDuration(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  let isDrag = false;
  let tempTsx = 0;
  let movement = 0;

  useEffect(() => {
    if (imgArr.length === 1) return;
    const evtHandler = function(evt) {
      if (!isDrag) return;
      const {
        touches: [{ clientX }]
      } = evt;
      movement = clientX - tempTsx;
      setTsx(-activeIdx * vw + movement);
    };
    const moveStart = function(evt) {
      if (!evt.path.some(e => e.className && e.className.includes("px-detail-imgs")))
        return;

      const {
        touches: [{ clientX }]
      } = evt;
      tempTsx = clientX;
      isDrag = true;
    };
    const moveEnd = function() {
      isDrag = false;
      const distance = vw / 5;
      if (-movement > distance && activeIdx + 1 < imgArr.length) {
        setActiveIdx(activeIdx + 1);
      } else if (movement > distance && activeIdx > 0) {
        setActiveIdx(activeIdx - 1);
      } else {
        setDuration(300);
        setTsx(-activeIdx * vw);
        const timer = setTimeout(() => {
          setDuration(0);
        }, 300);
      }
    };

    window.addEventListener("touchstart", moveStart);
    window.addEventListener("touchmove", evtHandler);
    window.addEventListener("touchend", moveEnd);
    return () => {
      window.removeEventListener("touchstart", moveStart);
      window.removeEventListener("touchmove", evtHandler);
      window.removeEventListener("touchend", moveEnd);
    };
  }, [imgArr, activeIdx]);

  return [duration, tsx, activeIdx];
}
