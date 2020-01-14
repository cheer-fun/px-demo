import React, { useState, useEffect, useContext } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

import ImgFlow from "../../components/ImgFlow";
import { getSearch } from "../../api/modules/search";
import { useQuery, useScroll } from "../../util";
import { useHistory } from "react-router-dom";
import { Context } from "../../store";

import { PUBLIC_PATH, DEFAULT_SEARCH } from "../../assets/config/index.yml";

export default function Search() {
  let pics = usePics();

  return (
    <div className="px-search">
      <ImgFlow pics={pics} />
    </div>
  );
}

function usePics() {
  let history = useHistory();
  let [query, location] = useQuery();
  let q = query.get("q");
  let [pics, setPics] = useState([]);
  let [kw, setKw] = useState("");
  let [page, done, reset] = useScroll();
  const { dispatch } = useContext(Context);

  const getData = debounce(async function(kw, page) {
    if (!kw) {
      return;
    }
    const {
      data: { data }
    } = await getSearch({ keyword: kw, page, XRestrict: 10 });
    setPics([...(page === 1 ? [] : pics), ...data.illustrations]);
    done();
  }, 1000);

  useEffect(() => {
    if (location?.pathname?.includes("/search") ?? false)
      dispatch({ type: "changeHeader", value: "search" });
    if (!q) {
      if (pics.length === 0) {
        history.push(`${PUBLIC_PATH}/search?q=${DEFAULT_SEARCH}`);
      }
      return;
    }
    setKw(q);
  }, [location]);

  useEffect(() => {
    setPics([]);
    if (page === 1) {
      getData(kw, page);
    }
    reset();
  }, [kw]);

  useEffect(() => {
    getData(kw, page);
  }, [page]);

  return pics;
}
