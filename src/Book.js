import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    title:PropTypes.string.isRequired,
    style:PropTypes.object.isRequired,
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
    const {title, authors, style, shelf, book, changeCategoriesHandle} = this.props

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={style}></div>
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={(e) => changeCategoriesHandle(book, e.target.value)}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
    )
  }
}

export default Book
