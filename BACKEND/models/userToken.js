const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const getUserTokenFromFile = (cb) => {
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
    getUserTokenFromFile(cb);
  }
};
