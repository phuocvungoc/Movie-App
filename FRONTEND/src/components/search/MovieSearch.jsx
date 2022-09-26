import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router";

import "./search.scss";

import MovieCard from "../movie-card/MovieCard";
import PageHeader from "../page-header/PageHeader";
import Button, { OutlineButton } from "../button/Button";

import tmdbApi from "../../api/tmdbApi";

const MovieSearch = (props) => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const mediaType = query.get("mediaType");
  const language = query.get("language");
  const year = query.get("year");
  const keyword = query.get("keyword");

  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const goToSearch = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const mediaType = e.target.mediaType.value;
    const language = e.target.language.value;
    const year = e.target.year.value;
    const keyword = e.target.keyword.value;
    const getSearchList = async () => {
      let response = null;
      response = await tmdbApi.getSearchList(
        category,
        mediaType,
        language,
        year,
        keyword,
        page
      );
      if (response !== null) {
        setData(response.results);
        setPage(Number(response.page));
        setTotalPage(Number(response.total_page));
      } else {
        setData(response);
      }
    };
    getSearchList();
    history.push(
      `/movie/search/${page}/?category=${category}&mediaType=${mediaType}&language=${language}&year=${year}&keyword=${keyword}`
    );
  };

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      response = await tmdbApi.getGenreList();
      setItems(response);
    };
    getGenreList();
  }, []);

  const loadMore = async () => {
    let pageNew = page + 1;
    let response = null;
    response = await tmdbApi.getSearchList(
      category,
      mediaType,
      language,
      year,
      keyword,
      pageNew
    );
    setData([...data, ...response.results]);
    setPage(page + 1);
  };

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
                <option value="en">England</option>
                <option value="ja">Japan</option>
                <option value="ko">Korea</option>
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
      {data !== null ? (
        <div className="container">
          <div className="section mb-3">
            <div className="movie-grid">
              {data.map((item, i) => (
                <MovieCard item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="section mb-3">
            <h1>Not Found Video!</h1>
          </div>
        </div>
      )}
      {data !== null && page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieSearch;
