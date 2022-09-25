import React from "react";

import "./page-header.scss";

import bg from "../../assets/footer-bg.jpg";

const PageHeader = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>List of {props.category} movies!</h2>
    </div>
  );
};

export default PageHeader;
