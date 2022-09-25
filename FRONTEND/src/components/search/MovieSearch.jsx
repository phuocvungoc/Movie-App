import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";

import "./search.scss";

import MovieCard from "../movie-card/MovieCard";
import PageHeader from "../page-header/PageHeader";
import Footer from "../footer/Footer";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const MovieSearch = (props) => {
  const history = useHistory();

  const [items, setItems] = useState([]);

  const goToSearch = (e) => {
    e.preventDefault();
    const category =
      e.target.category.value === "category"
        ? ""
        : `/${e.target.category.value}`;
    const mediaType =
      e.target.mediaType.value === "mediaType"
        ? ""
        : `/${e.target.mediaType.value}`;
    const language =
      e.target.language.value === "language"
        ? ""
        : `/${e.target.language.value}`;
    const year =
      e.target.year.value === "language" ? "" : `/${e.target.year.value}/`;
    const keyword = e.target.keyword.value;
    if (keyword.trim().length > 0) {
      history.push(
        "/movie/search" + category + mediaType + language + year + keyword
      );
    } else {
      alert("Please enter keywords");
    }
  };

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      response = await tmdbApi.getGenreList();
      setItems(response);
    };
    getGenreList();

    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <>
      <PageHeader category="search" />
      <div className="search">
        <form type="submit" onSubmit={goToSearch}>
          <div className="form">
            <div className="form--item name">
              <h3>Movie Name</h3>
              <input
                type="text"
                placeholder="Enter keyword"
                name="keyword"
                id="keyword"
              />
            </div>
            <div className="form--item year">
              <h3>Release year</h3>
              <input type="year" min="1900" max="2099" name="year" id="year" />
            </div>
            <div className="form--item select">
              <h3>Category</h3>
              <select name="category" id="category">
                <option value="category">Category</option>
                {items.map((item, i) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form--item select">
              <h3>Media Type</h3>
              <select name="mediaType" id="mediaType">
                <option value="mediaType">Media Type</option>
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="tv">Tv</option>
                <option value="person">Person</option>
              </select>
            </div>
            <div className="form--item select">
              <h3>Language</h3>
              <select name="language" id="language">
                <option value="language">Language</option>
                <option value="en-us">England-U.S</option>
                <option value="jp">Japan</option>
                <option value="kr">Korea</option>
              </select>
            </div>
            <div className="btn_search">
              <button type="submit" className="btn small">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MovieSearch;
