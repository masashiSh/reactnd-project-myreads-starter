import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import Book from './Book'

class ListBooks extends React.Component {
  static propTypes = {
    // showSearchPage: PropTypes.bool.isRequired,
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
    // debugger;
    const {onCloseSearch, books} = this.props
    console.log(books)
    const shelfList = ["currentlyReading", "wantToRead", "read"]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/*  book*/}
                  {books.filter(book => book.shelf===shelfList[0])
                    .map(book => (
                      <li key={book.title+book.authors}>
                        <Book
                          title={book.title}
                          authors={book.authors}
                          style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf===shelfList[1])
                    .map(book => (
                      <li key={book.title+book.authors}>
                        <Book
                          title={book.title}
                          authors={book.authors}
                          style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf===shelfList[2])
                    .map(book => (
                      <li key={book.title+book.authors}>
                        <Book
                          title={book.title}
                          authors={book.authors}
                          style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
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
