import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import VideoList from "./VideoList";

import "./detail.scss";

const Detail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(id);
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [id]);

  if (item !== null) {
    return (
      <>
        <div
          className="banner"
          style={{
            backgroundImage: `url(${apiConfig.originalImage(
              item.backdrop_path || item.poster_path
            )})`,
          }}
        ></div>
        <div className="mb-3 movie-content container">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  item.poster_path || item.backdrop_path
                )})`,
              }}
            ></div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">{item.title || item.name}</h1>

            <p className="overview">{item.overview}</p>
          </div>
        </div>
        <div className="container">
          <div className="section mb-3">
            <VideoList id={item.id} />
          </div>
        </div>
      </>
    );
  } else
    return (
      <div>
        <h1>Not Found Video!</h1>
      </div>
    );
};

export default Detail;
