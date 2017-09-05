import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    // title:PropTypes.string.isRequired,
    book:PropTypes.object.isRequired,
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    const {book, updateStatus} = this.props

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                `url(${book.imageLinks.thumbnail || book.imageLinks.smallThumbnail})`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={(e) => updateStatus(book, e.target.value)}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{!!book.authors ? book.authors.join(', '): 'Unknown'}</div>
        </div>
    )
  }
}

export default Book
