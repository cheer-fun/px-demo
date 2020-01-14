import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import bg1 from "../../assets/images/home/bg1.jpg";
import bg2 from "../../assets/images/home/bg2.jpg";
import bg3 from "../../assets/images/home/bg3.jpg";
import cat from "../../assets/images/home/cat.png";

import CommonInput from "../../components/Input";
import { Context } from "../../store";

const imgs = { bg: [bg1, bg2, bg3], cat };

export default function Home() {
  const { dispatch } = useContext(Context);
  let location = useLocation();

  const [active, setActive] = useState(0);
  const len = imgs.bg.length;
  const COOLDOWN = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((active + 1) % len);
    }, COOLDOWN);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    dispatch({ type: "changeHeader", value: "simple" });
  }, []);

  return (
    <div className="home">
      <div className="home-bg">
        {imgs.bg.map((bg, idx) => (
          <img
            aria-current={idx === active ? "show" : "hide"}
            className="home-bg-item"
            key={idx}
            src={bg}
          />
        ))}
      </div>
      <div className="home-search__wrapper">
        <div className="home-search">
          <CommonInput more />
        </div>
        <img className="home-search__decorator" src={imgs.cat} />
      </div>
      <footer className="home-footer">
        <span>Copyright © 2019 ❤ Arius</span>
      </footer>
    </div>
  );
}
