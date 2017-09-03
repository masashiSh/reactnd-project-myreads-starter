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
      // showSearchPage: false
    }))
  }

  // searchBooks = (query, maxResults=20)  => {
  //   return BooksAPI.search(query, maxResults)
  //   .then(result => {
  //     this.setState(state => (
  //       // books: state.books.concat([ result ])
  //       Object.assign({}, this.state, {
  //         result: [ result ]
  //       })
  //     ))
  //   })
  // }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    // console.log(this.searchBooks('Android'))
    // debugger;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            showSearchPage={this.state.showSearchPage}
            onCloseSearch={this.closeSearch}
            // onSearchBooks={this.searchBooks}
          />
        ) : (
          <ListBooks
            onCloseSearch={this.closeSearch}
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
