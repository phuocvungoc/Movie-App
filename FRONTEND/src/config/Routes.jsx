import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/detail/Detail";
import Login from "../components/login/login";
import MovieGrid from "../components/movie-grid/MovieGrid";
import MovieSearch from "../components/search/MovieSearch";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/movie" exact component={Home} />
      <Route path="/movie/id/:id" exact component={Detail} />
      <Route path="/movie/category/:category" exact component={MovieGrid} />
      <Route path="/movie/search/:page" exact component={MovieSearch} />
      <Route path="/movie/search/" exact component={MovieSearch} />
    </Switch>
  );
};

export default Routes;
