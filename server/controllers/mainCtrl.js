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

// Some function I found on stackoverflow that converts scientific notation to a number.
// Using to format one of the api values.
const scientificToDecimal = num => {
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    let zero = "0";
    let parts = String(num)
      .toLowerCase()
      .split("e"); //split into coeff and exponent
    let e = parts.pop(); //store the exponential part
    let l = Math.abs(e); //get the number of zeros
    let sign = e / l;
    let coeff_array = parts[0].split(".");

    if (sign === -1)
      num = zero + "." + new Array(l).join(zero) + coeff_array.join("");
    else {
      let dec = coeff_array[1];
      if (dec) l = l - dec.length;
      num = coeff_array.join("") + new Array(l + 1).join(zero);
    }
  }
  return num;
};

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
      // Object.values will grab just the values from the key value pairs.
      // That's needed here because of the structure of the data the API is sending.
      // Generally you wouldn't need to do this and can rely on the API's structure.
      data = Object.values(response.data.coins).map(val => {
        // get last number of rank to apply the appropriate suffix (2nd or 3rd or 4th etc.)
        const lastInt = Number(
          val.rank
            .toString()
            .split("")
            .pop()
        );
        // check if the usd of the coin is less that .00.
        // if it is, round it to the nearest decimal else fix it to 2 decimal places.
        const usdArray = val.usd.toString().split("");
        const usd =
          usdArray.slice(usdArray.indexOf(".")).length > 2
            ? val.usd.toFixed(usdArray.lastIndexOf("0") + 1)
            : val.usd.toFixed(2);
        // Check if the btc value is in scientific notation, if it is, convert it to a standard number.
        const btc = scientificToDecimal(val.btc);
        // Object.assign is returning a new object with all the data from the current object being mapped over.
        // We're then updating the rank, usd, and btc to have the new formatting.
        return Object.assign({}, val, {
          rank: val.rank + suffixes[lastInt],
          usd,
          btc
        });
      });
    })
    // log the error
    .catch(console.log);
}

// Send the data to the user
// OR if trying to view specific item, request that item and send that.
// This is reusable becasue we're sending back a query with the request
// IF tracked is on req.query, then we're asking for the tracked coins array
// otherwise we're asking for the general data array of coins.
const getData = (req, res, next) => {
  const { tracked } = req.query;
  if (tracked) res.json(userCoins);
  else res.json(data.slice(0, 25));
};

// Determine which data points to show
const paginateCoins = (req, res, next) => {
  // destructure from req.query
  // We sent back a query on our request that looks like '/api/paginate?paginate=previous'
  const { paginate } = req.query;
  // if we're trying to access the next page of data
  if (paginate === "next") {
    // increment our set by 25 and slice (copy) the next 25 items and send those to the client.
    currItem += 25;
    res.json(data.slice(currItem, currItem + 25));
  } else {
    // otherwise go back 25 and send the previous 25 items to the client.
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
  // check if the coin was added successfully and send a message back
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

// update users title in Tracker Component
// pulling title from query
const putData = (req, res, next) => {
  const { title } = req.query;
  userTitle = req.query;
  res.json(title);
};

// Stop Tracking Data
const deleteData = (req, res, next) => {
  // our coin name will sit on id because that's our place holder for a path parameter.
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
