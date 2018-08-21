import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  updateBook = (books) => {
    this.setState({ books })
  }

  render() {
    const shelfs = [
      { title: 'Currently Reading', value:'currentlyReading'},
      { title: 'Want to Read', value:'wantToRead'},
      { title: 'Read', value:'read'},
    ]

    const searchShelf = [
      { title: 'None', value:'none'},      
      { title: 'Currently Reading', value:'currentlyReading'},
      { title: 'Want to Read', value:'wantToRead'},
      { title: 'Read', value:'read'},
    ]

    return (
      <div className="app">
        <Route path='/Search' render={()=>(
          <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={e => {
                BooksAPI.search(e.target.value, 5).then(result => {
                  let results = result.map((book)=> book = (this.state.books.find((b) => b.id === book.id)||book))
                  this.setState({searchBooks : results})
                }).catch(()=> this.setState({searchBooks:[]}))
              }}/>

            </div>
          </div>
          <div className="search-books-results">
            <ListBooks 
              updateBook={this.updateBook}
              shelfs={searchShelf}
              books={this.state.searchBooks}
            />
          </div>
        </div>
        )} />
    
        <Route exact path='/' render={()=>(
          <div>
            <ListBooks 
              updateBook={this.updateBook}
              shelfs={shelfs}
              books={this.state.books}
            />
            <div className="open-search">
              <Link to='/Search' >Add a book</Link>
            </div>
        </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
