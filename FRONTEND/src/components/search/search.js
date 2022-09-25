import React, { useState } from "react";
import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import "./Search.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const token = JSON.parse(localStorage.getItem("token"));
const Search = () => {
  const [query, setQuery] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchMediaType, setSearchMediaType] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");

  const handleSearch = () => {
    setQuery({
      searchName,
      searchYear,
      searchGenre,
      searchMediaType,
      searchLanguage,
    });
  };

  const resetSearch = () => {
    setQuery("");
    setSearchName("");
    setSearchYear("");
    setSearchGenre("");
    setSearchMediaType("");
    setSearchLanguage("");
  };

  return (
    <div className="app">
      <Nav />
      <div className="container form">
        <Form>
          <div className="form-search">
            <FormGroup className="form-search-items">
              <Label>
                <h4>Tên Phim</h4>
              </Label>
              <Input
                type="title"
                className="input--name"
                name="title"
                id="title"
                placeholder="Tìm tên phim"
                bsSize="lg"
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className="form-search-items">
              <Label>
                <h4>Năm Phát Hành</h4>
              </Label>
              <Input
                type="year"
                className="input--year"
                name="year"
                id="year"
                placeholder="Năm phát hành"
                bsSize="lg"
                onChange={(e) => {
                  setSearchYear(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className="form-search-items">
              <Label for="genre">
                <h4>Thể Loại</h4>
              </Label>
              <Input
                type="select"
                name="genre"
                id="genre"
                bsSize="lg"
                onChange={(e) => {
                  setSearchGenre(e.target.value);
                }}
              >
                <option>Hành Động</option>
                <option>Hài Hước</option>
                <option>Hoạt Hình</option>
                <option>Lãng Mạn</option>
                <option>Chiến Tranh</option>
              </Input>
            </FormGroup>
            <FormGroup className="form-search-items">
              <Label for="mediaType">
                <h4>Loại Phim</h4>
              </Label>
              <Input
                type="select"
                name="mediaType"
                id="mediaType"
                bsSize="lg"
                onChange={(e) => {
                  setSearchMediaType(e.target.value);
                }}
              >
                <option>All</option>
                <option>Movie</option>
                <option>TV</option>
                <option>Person</option>
              </Input>
            </FormGroup>
            <FormGroup className="form-search-items">
              <Label for="language">
                <h4>Quốc Gia</h4>
              </Label>
              <Input
                type="select"
                name="language"
                id="language"
                bsSize="lg"
                onChange={(e) => {
                  setSearchLanguage(e.target.value);
                }}
              >
                <option>Anh - Mỹ</option>
                <option>Nhật Bản</option>
                <option>Hàn Quốc</option>
              </Input>
            </FormGroup>
          </div>
          <div className="btn--group">
            <Button
              color="warning"
              size="lg"
              className="btn--reset"
              onClick={resetSearch}
            >
              Reset
            </Button>
            <Button
              color="primary"
              size="lg"
              className="btn--search"
              onClick={() => handleSearch()}
            >
              Tìm Phim
            </Button>
          </div>
        </Form>
      </div>
      <SearchResult query={query} token={token} />
    </div>
  );
};

export default Search;
