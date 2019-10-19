const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const axios = require("axios");
const Books = require("./models/Books.js");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// -----------------------------  MIDDLEWARE  -----------------------------
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(require("compression")());
app.use(require("helmet")());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/booksdb", { useNewUrlParser: true });
// Define API routes here
// require("./routes")(app);
// Send every other request to the React app
// Define any API routes before this runs
app.get("/api/google", function(req, res) {
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q)
    .then(results => {
      const mappedBooks = results.data.items.map(book => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail,
          link: book.volumeInfo.infoLink
        };
      });

      res.json(mappedBooks);
    })
    .catch(error => {
      console.log(error);
      res.json([]);
    });
});
app.post("/api/books", function(req, res) {
  console.log(req.body);
  Books.create(req.body).then(results => {
    console.log(results);
  });
});
app.delete("/api/books/:id", function(req, res) {
  
  Books.deleteOne({_id:req.params.id}).then(results => {
    res.json(results);
  });
});
app.get("/api/books", function(req, res) {
  Books.find().then(results => {
    console.log(results);
    res.json(results);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// -----------------------------  API ROUTES  -----------------------------
// const { GOOGLE_API_SERVER_KEY } = process.env;
// const apiRouter = express.Router();
// // require("./routes")(apiRouter, db, axios, GOOGLE_API_SERVER_KEY);

// app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
