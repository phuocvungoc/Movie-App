import React, { useState, useEffect } from "react";
import "./movie-list.scss";
import { SwiperSlide, Swiper } from "swiper/react";
import tmdbApi from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (props.type === "trending" || props.type === "top-rate") {
        response = await tmdbApi.getMoviesList(props.type);
      } else {
        response = await tmdbApi.getGenre(props.id, 1);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
