"use client";

import { useEffect, useState } from "react";

export function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  return {
    screenWidth,
    screenHeight,
  };
}
