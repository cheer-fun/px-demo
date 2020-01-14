import React, { useState, useEffect } from "react";

export default function Pic({ src }) {
  let [opacity, setOpacity] = useState(0);
  
  return (
    <img src={src} style={{opacity}} onLoad={() => setOpacity(1)} />
  );
}
