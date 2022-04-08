import React, { useContext } from "react";
import { FullScreenContext } from "../context/FullScreenContext";

import "./_main.scss";
const MainContent = ({ children }) => {
  const { isFullScreen } = useContext(FullScreenContext);
  return (
    <section className={`main-content ${isFullScreen ? "full" : ""}`}>
      <div className="container-fluid no-gutters">
        <div className="row">
          <div className="col-lg-12 p-0">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
