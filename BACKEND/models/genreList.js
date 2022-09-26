const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const getGenreListFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  static fetchAll(cb) {
    getGenreListFromFile(cb);
  }
};
