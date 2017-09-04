import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
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
    const {books, shelfName, changeCategories, shelfTitle} = this.props
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
                    key={book.title+book.authors}
                    changeCategoriesHandle={changeCategories }
                    shelf={shelfName}
                    title={book.title}
                    authors={book.authors}
                    book={book}
                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
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
