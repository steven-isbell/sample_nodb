const axios = require("axios");
const baseUrl = "https://coinbin.org";
const data = [];
let selected = null;

if (data.length === 0) {
  axios
    .get(`${baseUrl}/coins`)
    .then(response => data.push(response.data))
    .catch(console.log);
}

const getData = (req, res, next) => {
  const { coin = null } = req.query;
  if (coin) {
    if (!selected) {
      axios
        .get(`${baseUrl}/${coin}`)
        .then(response => {
          selected = response.data;
          res.json(selected);
        })
        .catch(console.log);
    } else res.json(selected);
  } else res.json(data);
};

const postData = (req, res, next) => {
  res.json("2");
};

const putData = (req, res, next) => {
  res.json("3");
};

const deleteData = (req, res, next) => {
  res.json("4");
};

module.exports = {
  getData,
  postData,
  putData,
  deleteData
};
