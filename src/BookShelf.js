import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({books, shelfName, updateStatus, shelfTitle}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle[`${shelfName}`]}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { (!!books && books.length>0) &&
          books.filter(book => book.shelf===shelfName)
          .map((book, index) => (
            <li key={index}>
              <Book
                updateStatus={updateStatus }
                book={book}
              />
            </li>
          ))}
      </ol>
    </div>
  </div>
)


BookShelf.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  shelfTitle: PropTypes.object.isRequired
}

export default BookShelf
