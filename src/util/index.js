import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import {
  useLocation
} from "react-router-dom";

function useQuery() {
  const location = useLocation();
  return [new URLSearchParams(useLocation().search), location];
}

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const PRELOAD_PADDING = 1000;

function useScroll(delay=500) {
  let [scrollTop, setScrollTop] = useState(0);
  let [page, setPage] = useState(0);
  let [realPage, setRealPage] = useState(0);
  const vh = window.innerHeight;

  useEffect(() => {
    const onScroll = throttle((evt) => {
      const el = document.querySelector("html");
      setScrollTop(el.scrollTop);
      if (el.scrollTop > (el.scrollHeight - vh - PRELOAD_PADDING)) {
	if (page !== realPage + 1) {
	  setPage(realPage + 1);
	}
      }
    }, delay);
    let a = () => onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, realPage]);

  function reset() {
    setPage(1);
    setRealPage(1);
  }

  function done() {
    setRealPage(page);
  }
  
  return [page, done, reset, scrollTop, vh];
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export {
  useQuery,
  useWindowSize,
  useScroll,
  usePrevious
} 
