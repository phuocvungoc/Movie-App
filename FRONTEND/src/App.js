import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import Login from "./components/login/login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/movies" element={<Browse />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
