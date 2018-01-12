const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const port = 3001;

const app = express();

const {
  getData,
  postData,
  putData,
  deleteData,
  paginateCoins,
  searchCoins
} = require(`${__dirname}/controllers/mainCtrl`);

app.get("/api/get", getData);
app.get("/api/paginatecoins", paginateCoins);
app.get("/api/search", searchCoins);
app.post("/api/post", postData);
app.put("/api/put/:id", putData);
app.delete("/api/delete/:id", deleteData);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
