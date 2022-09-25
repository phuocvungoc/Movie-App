import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import PageHeader from "../page-header/PageHeader";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { category } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (category === "trending" || category === "top-rate") {
        response = await tmdbApi.getMovieList(category, page);
      } else {
        response = await tmdbApi.getGenre(category, page);
      }
      setItems(response.results);
      setTotalPage(response.total_page);
    };
    getList();
  }, [category]);

  const loadMore = async () => {
    let pageNew = page + 1;
    let response = null;
    if (category === "trending" || category === "top-rate") {
      response = await tmdbApi.getMovieList(category, pageNew);
    } else {
      response = await tmdbApi.getGenre(category, pageNew);
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      {/* <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div> */}
      <PageHeader category={category} />
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

// const MovieSearch = (props) => {
//   const history = useHistory();

//   const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

//   const goToSearch = useCallback(() => {
//     if (keyword.trim().length > 0) {
//       history.push(`/${category[props.category]}/search/${keyword}`);
//     }
//   }, [keyword, props.category, history]);

//   useEffect(() => {
//     const enterEvent = (e) => {
//       e.preventDefault();
//       if (e.keyCode === 13) {
//         goToSearch();
//       }
//     };
//     document.addEventListener("keyup", enterEvent);
//     return () => {
//       document.removeEventListener("keyup", enterEvent);
//     };
//   }, [keyword, goToSearch]);

//   return (
//     <div className="movie-search">
//       <Input
//         type="text"
//         placeholder="Enter keyword"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <Button className="small" onClick={goToSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

export default MovieGrid;
