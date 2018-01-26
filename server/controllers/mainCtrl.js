const axios = require("axios");
const baseUrl = "https://coinbin.org";
// Where we'll store our response from the API
let data = [];
// The coins the user wants to track
let userCoins = [];
// keeps track of the item we're paginating from
let currItem = 0;

// title of users tracker
let userTitle = "";

// Go Load our data from the api and put it in an array
if (data.length === 0) {
  axios
    .get(`${baseUrl}/coins`)
    .then(response => {
      // Alter the incoming data as needed
      const suffixes = [
        "th",
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
    })
    // log the error
    .catch(console.log);
}

// Send the data to the user
// OR if trying to view specific item, request that item and send that.
// This is reusable
const getData = (req, res, next) => {
  const { tracked } = req.query;
  if (tracked) res.json(userCoins);
  else res.json(data.slice(0, 25));
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

// Add coins to user tracker
const postData = (req, res, next) => {
  // add object to array, limit to 25, make sure it's not already in array
  if (
    userCoins.length <= 25 &&
    !userCoins.filter(coin => coin.name === req.body.name)[0]
  ) {
    userCoins.push(req.body);
  } else {
    return res.json({ message: `You're Already Tracking ${req.body.name}.` });
  }
  // check if the coin was added succesffully and send a message back
  if (userCoins[userCoins.length - 1].name)
    res.json({ message: `${userCoins[userCoins.length - 1].name} Tracked!` });
  else
    // otherwise send an error
    res.status(500).json({
      message:
        userCoins.length === 25
          ? "You May Only Track 25 Coins At A Time"
          : "Failed To Add Coin"
    });
};

// update users title
const putData = (req, res, next) => {
  const { title } = req.query;
  userTitle = req.query;
  res.json(title);
};

const deleteData = (req, res, next) => {
  const { id } = req.params;
  userCoins = userCoins.filter(coin => coin.name !== id);
  res.json(userCoins);
};

module.exports = {
  getData,
  postData,
  putData,
  deleteData,
  paginateCoins
};
