import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    // showSearchPage: PropTypes.bool.isRequired,
    // onCloseSearch: PropTypes.func.isRequired
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
    // debugger;
    // const {onCloseSearch} = this.props
    const {title, authors, style} = this.props
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={
                style

                }></div>
            <div className="book-shelf-changer">
              <select>
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
