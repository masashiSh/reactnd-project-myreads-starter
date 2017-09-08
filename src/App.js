import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  updateStatus = (book, newShelf) => {
    book.shelf = newShelf
    BooksAPI.update(book, newShelf).then((res) => {
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([book])
      }))
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
            updateStatus={this.updateStatus }
            books={this.state.books}
          />
        )} />
        <Route path="/" exact render={() => (
          <ListBooks
            updateStatus={this.updateStatus }
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
