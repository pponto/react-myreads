import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    returnedbooks: []
  }

  searchBooks = (query) => {

    this.setState({ query: query.trim() })

    if (query) {
      BooksAPI.search(query, 10).then((newBooks) => {
        if (!newBooks.error) {
          for (let k1 in newBooks) {
            newBooks[k1].shelf = 'none'
            let foundBooks = this.props.books
            for (let k in foundBooks) {
              if (newBooks[k1].id === foundBooks[k].id) {
                newBooks[k1].shelf = foundBooks[k].shelf
              }
            }
          }
          this.setState({ returnedbooks: !newBooks.error ? newBooks : [] })
        }
      })
    }
    else {
      this.setState({ returnedbooks: [] })
    }

  }

  render() {

    const { returnedbooks } = this.state
    const { onUpdateBook } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input value={returnedbooks.shelf} onChange={(event) => this.searchBooks(event.target.value)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {returnedbooks.map((book) => ( 
            <li key={book.id}>
              <div  className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}`}}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => onUpdateBook(book, event.target.value)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{(book.authors ? book.authors.join(", ") : '')}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )

  }

}

export default SearchBooks
