const axios = require("axios");
const baseUrl = "https://coinbin.org";
let data = [];
let selected = null;
let currItem = 0;

if (data.length === 0) {
  axios
    .get(`${baseUrl}/coins`)
    .then(response => {
      data = [...Object.values(response.data.coins)];
    })
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
  } else res.json(data.slice(0, 10));
};

const paginateCoins = (req, res, next) => {
  const { paginate } = req.query;
  console.log(paginate);
  if (paginate === "next") {
    currItem += 10;
    res.json(data.slice(currItem, currItem + 10));
  } else {
    currItem -= 10;
    res.json(data.slice(currItem, currItem + 10));
  }
};

const searchCoins = (req, res, next) => {
  const { searchTerm } = req.query;
  if (!searchTerm) res.json(data);
  else {
    const filtered = data.filter(coin => coin.name.includes(searchTerm));
    res.json(filtered);
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
  deleteData,
  paginateCoins,
  searchCoins
};
