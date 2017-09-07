import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import Error from './Error'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

class Search extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query:'',
    result: [],
    error:''
  }
  handleSearch = (query) => {
    this.setState({
      query: query.trim(),
      result: [],
      error: ''
    })
    !!(query.length > 0) && this.searchBooks(query.trim())
  }
  debounceHandleSearch = debounce(query => { this.handleSearch(query)
  })

  searchBooks = (query, maxResults=20)  => {
    const {books} = this.props
    BooksAPI.search(query, maxResults)
    .then(res => {
      // TODO:  refactor
      this.setState({
        error: '',
        result: Object.assign(
          [],
          res.filter(r => !(books.map(b => b.id).includes(r.id)))
             .map(b => {b.shelf = "none"; return b}),
          books.filter(b => res.map(r => r.id).includes(b.id))
        )
      })
    })
    .catch(e => {
      this.setState((state) => ({
        error: `Your search ${query} did not match any books.`,
        result: []
      }))
    })
  }

  render() {
    const {result, error, query} = this.state
    const {updateStatus, books} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to="/"
          >
            Close
          </Link>
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
              onChange={(e) => this.debounceHandleSearch(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(!!(query.length > 0) && !!error) &&
              <Error
                error={error}
                query={query}
              />}
            {
              (!!result && result.length>0) &&
              result.map((book, index) => (
              <li key={index}>
                <Book
                  book={book}
                  books={books}
                  updateStatus={updateStatus}
                />
              </li>
            ))
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
