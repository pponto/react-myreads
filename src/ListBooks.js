import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  state = {
    books: []
  }

  updateBook = (book, shelf) => {
    console.log(book)
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books })
        this.props.updateBook(books)
      })
    })
  }

  render() {
    const { shelfs, books } = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf) => (
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books.filter((book) => book.shelf === shelf.value || (shelf.value === 'none' && book.shelf === undefined)).map((book) => (
                    <li>
                     <Book
                      key={book.id}
                      book={book}
                      updateBook={this.updateBook}
                     />
                    </li>
                  ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks