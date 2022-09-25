import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Login from "../components/login/login";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/movie" exact component={Home} />
      <Route path="/movie/:id" exact component={Detail} />
      <Route path="/category/:category" exact component={MovieGrid} />
      <Route path="/:category/search/:keyword" exact component={Catalog} />
    </Switch>
  );
};

export default Routes;
