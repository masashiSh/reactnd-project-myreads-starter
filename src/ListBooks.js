import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
  static propTypes = {
    onCloseSearch: PropTypes.func.isRequired
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
    const {onCloseSearch, books, changeCategories} = this.props
    const shelfList = ["currentlyReading", "wantToRead", "read"]
    const shelfTitle = [{"currentlyReading": "Currently Reading"}, {"wantToRead": "Want to Read"}, {"read": "Read"}]
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
                shelf={shelf}
                books={books}
                title={shelfTitle[`${shelf}`]}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => onCloseSearch(this.state.showSearchPage)}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
