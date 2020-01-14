import React, { useState, useEffect, useContext } from "react";
import debounce from "lodash/debounce";

import ImgFlow from "../../components/ImgFlow";
import { related } from "../../api/modules/detail";

export default function Related({ pid }) {
  let [pics, setPics] = useState([]);
  const getData = debounce(async function(pid) {
    if (pid === 0) return;
    const {
      data: { data }
    } = await related(pid);
    data && setPics(data);
  }, 1000);

  useEffect(() => {
    getData(pid);
    return () => setPics([]);
  }, [pid]);
  
  return (
    <div className="px-detail-related">
      <ImgFlow pics={pics} />
    </div>
  );
}
