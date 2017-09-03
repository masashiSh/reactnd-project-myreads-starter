import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import {isEqual} from 'lodash'

class BooksApp extends React.Component {
  shoudComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props,nextProps) || !isEqual(this.state,nextState)
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    result:[]
  }

  closeSearch = (state) => {
    this.setState((state) => ({
      showSearchPage: !this.state.showSearchPage
    }))
  }

  changeCategories = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      const currentBooks = this.state.books
      const nextBooks = currentBooks.map((book) => (book.id===result.id)? book.shelf = shelf: book)
      this.setState({ books: nextBooks })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            changeCategories={this.changeCategories }
            showSearchPage={this.state.showSearchPage}
            onCloseSearch={this.closeSearch}
          />
        ) : (
          <ListBooks
            changeCategories={this.changeCategories }
            onCloseSearch={this.closeSearch}
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
