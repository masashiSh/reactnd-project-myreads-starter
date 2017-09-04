import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {
  static propTypes = {
    changeCategories: PropTypes.func.isRequired
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
    const { books, changeCategories } = this.props
    const shelfList = ["currentlyReading", "wantToRead", "read"]
    const shelfTitle = {"currentlyReading": "Currently Reading", "wantToRead": "Want to Read", "read": "Read"}
    // const shelfTitle = [{"currentlyReading": "Currently Reading"}, {"wantToRead": "Want to Read"}, {"read": "Read"}]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {(!!books && books.length>0) &&
              shelfList.map(shelf => (
              <BookShelf
                changeCategories={changeCategories }
                key={shelf}
                shelfName={shelf}
                books={books}
                // title={shelfTitle[`${shelf}`]}
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
