const axios = require("axios");
const baseUrl = "https://coinbin.org";
// Where we'll store our response from the API
let data = [];
// Which item the user wants more detail on
let selected = null;
// keeps track of the item we're paginating from
let currItem = 0;

// Go Load our data from the api and put it in an array
if (data.length === 0) {
  axios
    .get(`${baseUrl}/coins`)
    .then(response => {
      data = [...Object.values(response.data.coins)];
    })
    .catch(console.log);
}

// Send the data to the user
// OR if trying to view specific item, request that item and send that.
// This is reusable
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
  } else res.json(data.slice(0, 50));
};

// Determine which data points to show
const paginateCoins = (req, res, next) => {
  // destructure from req.query
  const { paginate } = req.query;
  if (paginate === "next") {
    currItem += 50;
    res.json(data.slice(currItem, currItem + 50));
  } else {
    currItem -= 50;
    res.json(data.slice(currItem, currItem + 50));
  }
};

// Search through and send the searched for data
const searchCoins = (req, res, next) => {
  const { searchTerm } = req.query;
  console.log(searchTerm);
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
