import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'
import Error from './Error'
import { Link } from 'react-router-dom'

class Search extends React.Component {
  static propTypes = {
    updateStatus: PropTypes.func.isRequired,
  }

  state = {
    query:'',
    result: [],
    error:''
  }

  handleSearch = (query) => {
    !!(query.trim().length > 0) && this.searchBooks(query.trim())
    this.setState({
      query: query,
      result: [],
      error: ''
    })
  }

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
    const {updateStatus} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (!!(query.length > 0) && !!error) &&
              <Error
                error={error}
                query={query}
              />
            }
            {
              (!!result && result.length>0) &&
              result.map((book, index) => (
              <li key={index}>
                <Book
                  book={book}
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
