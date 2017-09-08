import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
  static propTypes = {
    updateStatus: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelfTitle: PropTypes.object.isRequired
  }

  render() {
    const {books, shelfName, updateStatus, shelfTitle} = this.props
    return (
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
  }
}

export default BookShelf
