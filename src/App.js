import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Library from './components/library'
import Book from './components/Book'
import './App.css'

class BooksApp extends Component {
	state = {
		books: [],
		query: '',
		showingBooks: []
	}

	/**
	 * @description get all books before loading the component
	 */
	componentDidMount() {
		BooksAPI.getAll().then(books => this.setState({ books }))
	}

	/**
	 * @description handles moving a book from one shelf to another
	 * @param book
	 * @param shelf
	 */
	updateShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			// Change the position of an existing book in the shelf
			book.shelf = shelf
			this.setState((state) => ({
				books: state.books.filter((b) => (
					b.id !== book.id
				)).concat(shelf !== "none" ? [ book ] : [])
			}))
		})
	}

	/**
	 * @description handling the searching method
	 */
	updateQuery = query => {
		this.setState({ query });
		let showingBooks = [];
		if (query) {
		  	BooksAPI.search(query).then(response => {
				if (response.length) {
				  	showingBooks = response.map(b => {
						const index = this.state.books.findIndex(c => c.id === b.id);
						if (index >= 0) {
						  	return this.state.books[index]
						} else {
						  	return b
						}
				  	})
				}
				this.setState({showingBooks})
		  	})
		} else {
		  	this.setState({showingBooks})
		}
  	}

	/**
	 * @description renders the app and handles routing
	 */
	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<Library
						books={this.state.books}
						onUpdateBook={this.updateShelf}
					/>
				)}/>

				<Route path="/search" render={() => (
				  	<div className="search-books">
						<div className="search-books-bar">
						  	<Link className="close-search" to="/">Close</Link>
						  	<div className="search-books-input-wrapper">
								<input type="text"
									   placeholder="Search by title or author"
									   value={this.state.query}
									   onChange={(event) => this.updateQuery(event.target.value)}
								/>
						  	</div>
						</div>
						<div className="search-books-results">
						  	<ol className="books-grid">
								{this.state.showingBooks.map((book, i) => (
								  	<Book key={i} book={book}
										onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}
									/>
								))}
						  	</ol>
						</div>
				  	</div>
				)}/>
			</div>
		)
	}
}

export default BooksApp