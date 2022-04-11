import React, { useContext } from "react";
import { FullScreenContext } from "../../context/FullScreenContext";

const ToggleSidebar = () => {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);
  return (
    <>
      {isFullScreen && (
        <div
          className="toggle-sidebar"
          onClick={() => setIsFullScreen(!isFullScreen)}
        >
          <i className="gg-menu-round"></i>
        </div>
      )}
    </>
  );
};

export default ToggleSidebar;
