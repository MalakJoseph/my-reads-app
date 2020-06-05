import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	}

	render() {
		const { book, onUpdateBook } = this.props
		const { id, shelf, title, authors, imageLinks } = book
		const shelfs = ['currentlyReading', 'wantToRead', 'read', 'none']

		return (
			<div className="book" id={id} key={id}>
				<div className="book-top">
					<div className="book-cover" style={{
							width: 128, height: 193,
							backgroundImage: imageLinks ? `url(${imageLinks.thumbnail})`: null }}>
					</div>
					<div className="book-shelf-changer">
						<select value={shelf || "none"} onChange={(event) => {
							onUpdateBook(book, event.target.value)
						}}>
							{shelfs.map((shelf, index) => <option value={shelf} key={index}>{shelf}</option>)}
						</select>
					</div>
				</div>
				<div className="book-title">
					<h2>
						{title}
					</h2>
				</div>
				<div className="book-authors">{authors}</div>
			</div>
		)
	}
}

export default Book