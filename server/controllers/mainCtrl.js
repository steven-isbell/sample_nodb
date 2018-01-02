const axios = require("axios");
const baseUrl = "https://coinbin.org/";
const data = [];

const getData = (req, res, next) => {
  const { coin = null } = req.query;
  if (data.length === 0) {
    if (!coin) {
      axios.get(`${baseUrl}`).then(response => res.json(response.data));
    } else {
      axios.get(`${baseUrl}/${coin}`).then(response => res.json(response.data));
    }
  } else {
    if (!coin) {
      res.json(data);
    } else {
      res.json(data.filter(val => val.ticker === coin));
    }
  }
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
