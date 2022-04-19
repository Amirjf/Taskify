import React, { useContext, useState } from "react";
import { FullScreenContext } from "../../context/FullScreenContext";
import "./_toggle-menu-mobile.scss";

const ToggleMenuMobile = () => {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  return (
    <>
      <div
        className="burger-button"
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        <i className="bx bx-menu"></i>
      </div>
    </>
  );
};

export default ToggleMenuMobile;
