import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {
  static propTypes = {
    updateStatus: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const {books, updateStatus} = this.props
    const shelfList = ["currentlyReading", "wantToRead", "read"]
    const shelfTitle = {"currentlyReading": "Currently Reading", "wantToRead": "Want to Read", "read": "Read"}
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              (!!books && books.length>0) &&
              shelfList.map(shelf => (
              <BookShelf
                updateStatus={updateStatus }
                key={shelf}
                shelfName={shelf}
                books={books}
                shelfTitle={shelfTitle}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
