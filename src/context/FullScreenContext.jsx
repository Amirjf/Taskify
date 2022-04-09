import React, { useState } from "react";

export const FullScreenContext = React.createContext(false);
export const SetFullScreenContext = React.createContext(null);

export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setIsFullscreen] = useState(false);
  const toggle = () => setIsFullscreen(!isFullScreen);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, toggle }}>
      {children}
    </FullScreenContext.Provider>
  );
};
