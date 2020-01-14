import React, { useState, useEffect } from "react";
import { input as doc } from "../assets/doc/common.yml";
import { useAnimate } from "../util";
import IconBtn from "./btn";
import { useQuery } from "../util";
import { useHistory } from "react-router-dom";

import { PUBLIC_PATH, DEFAULT_SEARCH } from "../assets/config/index.yml";

export default function Input({ more = false }) {
  const [val, setVal] = useState("");
  let history = useHistory();
  let [query, location] = useQuery();
  let q = query.get("q");
 
  useEffect(() => {
    setVal(q || DEFAULT_SEARCH);
  }, [location]);

  
  const iconCfg = more
    ? [
        {
          key: 1,
          btnClass: "px-input__subfix--2",
          iconName: "camera"
        },
        {
          key: 2,
          btnClass: "px-input__subfix",
          iconName: "search",
          callback: () => {
            search();
          }
        }
      ]
    : [];

  const enter = (evt) => {
    if (evt.keyCode === 13) {
      search();
    }
  };

  const search = () => {
    history.push(`${PUBLIC_PATH}/search?q=${val}`);
  };
  
  return (
    <div className="px-input">
      <input
        placeholder={doc.placeholder}
        className="px-input__inner"
        value={val}
        onChange={(evt) => setVal(evt.target.value)}
        onKeyUp={(evt) => enter(evt)}
      />
      {iconCfg.map(cfg => (
        <IconBtn {...cfg} />
      ))}
    </div>
  );
}
