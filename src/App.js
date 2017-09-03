import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  closeSearch = (state) => {
    this.setState((state) => ({
      showSearchPage: !this.state.showSearchPage
      // showSearchPage: false
    }))
  }
  // <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            showSearchPage={this.state.showSearchPage}
            onCloseSearch={this.closeSearch}
          />
        ) : (
          <ListBooks
            onCloseSearch={this.closeSearch}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
