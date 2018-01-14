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
      // Alter the incoming data as needed
      const suffixes = [
        "",
        "st",
        "nd",
        "rd",
        "th",
        "th",
        "th",
        "th",
        "th",
        "th",
        "th",
        "th",
        "th"
      ];
      data = [...Object.values(response.data.coins)].map(val => {
        const lastInt = Number(
          val.rank
            .toString()
            .split("")
            .pop()
        );
        return Object.assign({}, val, {
          rank: val.rank + suffixes[lastInt],
          usd: val.usd.toFixed(
            Math.max(2, (val.usd.toString().split(".")[1] || []).length)
          )
        });
      });
      console.log(data[0]);
    })
    // log the error
    .catch(console.log);
}

// Send the data to the user
// OR if trying to view specific item, request that item and send that.
// This is reusable
const getData = (req, res, next) => {
  const { coin = null } = req.query;
  if (coin) {
    if (!selected || selected !== coin) {
      axios
        .get(`${baseUrl}/${coin}`)
        .then(response => {
          selected = response.data;
          res.json(selected);
        })
        .catch(err => res.status(500).json(err));
    } else res.json(selected);
  } else res.json(data.slice(0, 25));
};

// Determine which data points to show
const paginateCoins = (req, res, next) => {
  // destructure from req.query
  const { paginate } = req.query;
  if (paginate === "next") {
    currItem += 25;
    res.json(data.slice(currItem, currItem + 25));
  } else {
    currItem -= 25;
    res.json(data.slice(currItem, currItem + 25));
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
