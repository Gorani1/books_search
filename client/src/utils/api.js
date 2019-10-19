import axios from "axios";


export default {
  // Gets all books
 
  // Gets the book with the given id
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  getSavedBooks: function(){
    return axios.get("/api/books")
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};