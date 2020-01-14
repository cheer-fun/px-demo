import React from "react";
import { Link } from "react-router-dom";

import camera from "../assets/images/menu/camera.png";
import search from "../assets/images/menu/search.png";
import notice from "../assets/images/menu/notice.png";
import links from "../assets/images/menu/links.png";
import rank from "../assets/images/menu/rank.png";
import money from "../assets/images/menu/money.png";
import spotlight from "../assets/images/menu/spotlight.png";
import forum from "../assets/images/menu/forum.png";

import { PUBLIC_PATH } from "../assets/config/index.yml";

const config = [
  {
    label: "spotlight",
    icon: spotlight,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "以图搜图",
    icon: camera,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "友情链接",
    icon: links,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "捐助",
    icon: money,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "排行榜",
    icon: rank,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "搜索",
    icon: search,
    link: `${PUBLIC_PATH}/search`
  },
  {
    label: "用户须知",
    icon: notice,
    link: `${PUBLIC_PATH}/`
  },
  {
    label: "论坛",
    icon: forum,
    link: `${PUBLIC_PATH}/`
  }
];

export default function Menu() {
  return (
    <div className="px-menu">
      <div className="px-menu__links">
        {config.map((cfg, idx) => (
          <Link key={idx} to={cfg.link} className="px-menu__links--item">
            <img src={cfg.icon} alt={cfg.label} />
            <p>{cfg.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
