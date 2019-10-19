
const axios = require('axios');
module.exports = function(app) {
  app.get("/api/books", function(req, res) {
      console.log("testroute");
    res.json(tableData);
  });
  app.post("/api/books", function(req, res) {
    res.json(tableData);
  });
  app.delete("/api/books/:id", function(req, res) {
      console.log(req.params);
    res.json(tableData);
  });

  app.get("/api/google", function(req, res) {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + req.query.q)
    .then((results) => {

        const mappedBooks = results.data.items.map((book) => {
            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors.join(","),
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks.thumbnail,
                link: book.volumeInfo.infoLink
            }
        });

        res.json(mappedBooks);
    }).catch(error => {
        console.log(error);
        res.json([]);
    });

  
});

  
};
