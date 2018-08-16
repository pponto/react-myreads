import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    const results = this.state.books.filter(currentbook => currentbook.id !== book.id)
    results.push(book)

    this.setState({ books: results })

    BooksAPI.update(book.shelf)
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            onUpdateBook={this.updateBook}
            books={this.state.books}
          />
        )}/>

        <Route exact path='/search' render={() => (
          <SearchBooks
            onUpdateBook={this.updateBook}
            books={this.state.books}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
