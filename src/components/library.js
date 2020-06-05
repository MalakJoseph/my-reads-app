import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Library extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	}

	render() {
		const { books, onUpdateBook } = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>Library</h1>
					<div className="open-search">
						<Link to='/search'>Add a book</Link>
					</div>
				</div>
				<div className="list-books-content">
					<div>
						{["currentlyReading", "wantToRead", "read"].map((shelf) => (
							<div className="bookshelf" key={shelf}>
								<h2 className="bookshelf-title">{shelf.toUpperCase()}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{books.length > 0 && books.filter((book) => (
											book.shelf === shelf
										)).map((book) => (
											<li key={book.id}>
												<Book id={book.id} book={book} onUpdateBook={onUpdateBook}/>
											</li>
										))}
									</ol>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Library