import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Library from "./components/library";
import Book from "./components/Book";
import "./App.css";

export default function BooksApp() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [showingBooks, setShowingBooks] = useState([]);

  /**
   * @description get all books before loading the component
   */
  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);

  /**
   * @description handles moving a book from one shelf to another
   * @param book
   * @param shelf
   */
  const updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // Change the position of an existing book in the shelf
      book.shelf = shelf;
      setBooks(() =>
        books
          .filter((b) => b.id !== book.id)
          .concat(shelf !== "none" ? [book] : [])
      );
    });
  };

  /**
   * @description handling the searching method
   */
  const updateQuery = (query) => {
    setQuery(query);
    let showingBooks = [];
    if (query) {
      BooksAPI.search(query).then((response) => {
        if (response.length) {
          showingBooks = response.map((b) => {
            const index = books.findIndex((c) => c.id === b.id);
            if (index >= 0) {
              return books[index];
            } else {
              return b;
            }
          });
        }
        setShowingBooks(showingBooks);
      });
    } else {
      setShowingBooks(showingBooks);
    }
  };

  /**
   * @description renders the app and handles routing
   */
  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => <Library books={books} onUpdateBook={updateShelf} />}
      />
      <Route
        path="/search"
        render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {showingBooks.map((book, i) => (
                  <Book
                    key={i}
                    book={book}
                    onUpdateBook={(book, shelf) => updateShelf(book, shelf)}
                  />
                ))}
              </ol>
            </div>
          </div>
        )}
      />
    </div>
  );
}
