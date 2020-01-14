import throttle from "lodash/throttle";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import ImgCarousel from "./ImgCarousel";
import Related from "./Related";
import { getPixById, relatived } from "../../api/modules/detail";
import { useQuery, useScroll } from "../../util";
import { useStore } from "../../store";

import { IMG_PREFIX } from "../../assets/config/index.yml";

export default function Detail() {
  let [pid, setPid] = useState(0);
  let [query, location] = useQuery();
  let [isShow, info, imgArr, author, intro, style] = useDetail(pid, location);
  useEffect(() => {
    setPid(query.get("pid"));
  }, [location]);
  let opacity = {
    opacity: isShow ? 1 : 0
  };
  return (
    <div className="px-detail__wrapper">
      {isShow && (
        <div style={opacity} className="px-detail" data-pid={pid}>
          <ImgCarousel {...{ style, imgArr }} />
          <div className="px-detail-info">
            <p className="px-detail-info-title">{info.title}</p>
            <div className="px-detail-info__author">
              <div className="px-detail-info__author-avatar">
                <img src={author.avatar} />
              </div>
              <span className="px-detail-info__author-name">{author.name}</span>
            </div>
          </div>
          <div className="px-detail-info-intro"></div>
        </div>)}
      <Related pid={pid} />
    </div>
  );
}

function useDetail(pid, location) {
  const { dispatch } = useStore();
  let history = useHistory();

  let [isShow, setIsShow] = useState(false);
  let [style, setStyle] = useState({});
  let [info, setInfo] = useState({});
  let [imgArr, setImgArr] = useState([]);
  let [author, setAuthor] = useState({});
  let [intro, setIntro] = useState([]);
  const getData = async function(pid) {
    const {
      data: { data }
    } = await getPixById(pid);
    data && setInfo(data);
  };

  useEffect(() => {
    const currentStatus = info.id && `${info.id}` === pid;
    setIsShow(currentStatus);
    if (currentStatus) {
      setImgArr(
        info.imageUrls.map(e => `${IMG_PREFIX}${e.large.replace("_webp", "")}`)
      );
      setAuthor({
        ...info.artistPreView,
        avatar: `${IMG_PREFIX}${info.artistPreView.avatar}`
      });
      const style =
        info.imageUrls.length > 1
          ? {
              width: "100vw",
              height: "100vh"
            }
          : {
              marginTop: "40px",
              width: "100vw",
              height: `${(info.height * window.innerWidth) / info.width}px`
            };
      setStyle(style);
      setIntro(
        info.caption
          .split("<br />")
          .map(line => line.replace("//", ""))
          .filter(line => line)
      );
    }
  }, [info]);

  useEffect(() => {
    if (isShow && location?.pathname?.includes("/detail"))
      dispatch({
        type: "changeHeader",
        value: imgArr?.length > 1 ? "opacity" : "white"
      });
  }, [location, isShow, imgArr]);

  useEffect(() => {
    if (location?.pathname?.includes("/detail"))
      dispatch({ type: "changeHeader", value: "opacity" });
    if (info && pid === `${info.id}`) {
    } else if (pid) {
      setImgArr([]);
      setInfo({});
      getData(pid);
    }
  }, [pid, location]);

  return [isShow, info, imgArr, author, intro, style];
}
