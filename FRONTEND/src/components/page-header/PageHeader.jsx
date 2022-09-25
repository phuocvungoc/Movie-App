import React, { useState, useEffect } from "react";

import "./page-header.scss";

import bg from "../../assets/footer-bg.jpg";
import tmdbApi from "../../api/tmdbApi";

const PageHeader = (props) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      response = await tmdbApi.getGenreList();
      if (props.category === "trending" || props.category === "top-rate") {
        setCategory(props.category);
      } else {
        let data = response.find((item) => item.id === Number(props.category));
        setCategory(data.name);
      }
    };
    getGenreList();
  }, []);
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>List of {category} movies!</h2>
    </div>
  );
};

export default PageHeader;
