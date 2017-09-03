import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends React.Component {
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
    showSearchPage: false,
    query:'',
    result:[]
  }
  HandleSearch = (query) => {
    this.setState({query: query.trim()})
    this.searchBooks(this.state.query)
  }
  searchBooks = (query, maxResults=20)  => {
    BooksAPI.search(query, maxResults)
    .then(result => {
      this.setState({ result
      })
    })
  }

  render() {
    const {onCloseSearch} = this.props
    const {result} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search"
            onClick={() => onCloseSearch(this.state.showSearchPage)}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.HandleSearch(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(!!result && result.length>0) &&
              result.map(book => (
              <li key={book.title+book.authors}>
                <Book
                  changeCategoriesHandle={this.props.changeCategories }
                  title={book.title}
                  authors={book.authors}
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

export default Search
