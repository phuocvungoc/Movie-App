import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import tmdbApi, { category, movieType } from "../api/tmdbApi";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      response = await tmdbApi.getGenreList();
      setItems(response);
    };
    getGenreList();
  }, []);
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie/category/trending">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.trending} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie/category/top-rate">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.top_rate} />
        </div>
        {items.map((item, i) => (
          <div className="section mb-3" key={i}>
            <div className="section__header mb-2">
              <h2>{item.name}</h2>
              <Link to={`/movie/category/${item.id}`}>
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList type={item.name} id={item.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
