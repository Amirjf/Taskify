import React from "react";
import "./_main.scss";
const MainContent = ({ children }) => {
  return (
    <section className="main-content">
      <div className="container-fluid no-gutters">
        <div className="row">
          <div className="col-lg-12 p-0">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
