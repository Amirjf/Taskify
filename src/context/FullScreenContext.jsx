import React, { useState, createContext } from "react";

export const FullScreenContext = createContext({
  isFullScreen: false,
  setIsFullScreen: () => null,
});

export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const toggle = () => setIsFullscreen(!isFullScreen);
  const value = { isFullScreen, setIsFullScreen };

  return (
    <FullScreenContext.Provider value={value}>
      {children}
    </FullScreenContext.Provider>
  );
};
