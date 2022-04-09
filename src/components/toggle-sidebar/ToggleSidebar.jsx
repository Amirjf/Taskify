import React, { useContext } from "react";
import { FullScreenContext } from "../../context/FullScreenContext";

const ToggleSidebar = () => {
  const { isFullScreen, toggle } = useContext(FullScreenContext);
  return (
    <>
      {isFullScreen && (
        <div className="toggle-sidebar" onClick={toggle}>
          <i className="gg-menu-round"></i>
        </div>
      )}
    </>
  );
};

export default ToggleSidebar;
