import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import {isEqual} from 'lodash'
import { Route } from 'react-router-dom'

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

  changeCategories = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      const currentBooks = this.state.books
      const nextBooks = currentBooks.map((book) => (book.id===result.id)? book.shelf = shelf: book)
      this.setState({ books: nextBooks })
    })
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
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
        <Route path="/search" render={() =>(
          <Search
            changeCategories={this.changeCategories }
            showSearchPage={this.state.showSearchPage}
          />
        )} />
        <Route path="/" exact render={() => (
          <ListBooks
            changeCategories={this.changeCategories }
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
