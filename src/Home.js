import React, { Component } from "react";
import raw from "./apiService";
import { getCookie, removeCookies } from "./util";
import "./style.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookList: [],
      userInfo: {},
      isLoading: false
    };
  }

  getAllBooks = () => {
    this.setState({ isLoading: true });
    return raw
      .post("http://172.19.4.39:4000/book/getBooks", {
        id: getCookie("userName")
      })
      .then(r => {
        this.setState({ books: r, bookList: r, isLoading: false });
      });
  };

  getUerConfig = () => {
    this.setState({ isLoading: true });

    return raw
      .post("http://172.19.4.39:4000/user/getUser", {
        user: getCookie("userName")
      })
      .then(r => {
        this.setState({ userInfo: r[0], isLoading: false });
      });
  };

  componentDidMount() {
    this.getAllBooks();
    this.getUerConfig();
  }
  assignBook = id =>
    raw
      .post("http://172.19.4.39:4000/user/assign", {
        user: getCookie("userName"),
        assigned_book: id
      })
      .then(r => {
        alert("This book has been assigned to you.");

        this.getAllBooks();
        this.getUerConfig();
      });
  requestBook = id =>
    raw
      .post("http://172.19.4.39:4000/user/requestBook", {
        user: getCookie("userName"),
        bookId: id
      })
      .then(r => {
        alert(r.err);
        this.getUerConfig();
      });
  returnBook = id =>
    raw
      .post("http://172.19.4.39:4000/user/returnBook", {
        user: getCookie("userName"),
        bookId: id
      })
      .then(r => {
        this.getUerConfig();
        this.getAllBooks();
      });

  serachBook = value => {
    const searchedBooks = this.state.books.filter(book => {
      if (!value.length) return true;
      return book.bookName.toLowerCase().includes(value);
    });
    this.setState({ bookList: searchedBooks });
  };
  render() {
    const { bookList, userInfo, isLoading } = this.state;
    return (
      <div>
        <div className="header">
          <div>
            <img
              width="150"
              src="data:image/png;base64, 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"
            />
          </div>
          <div>
            <img
              src="https://img.icons8.com/cotton/64/000000/user-male-circle.png"
              onClick={() => {
                removeCookies();
                this.props.history.push("/");
              }}
              height="50"
              width="50"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="loader" />
        ) : (
          <div className="card-home">
            <div className="searchBox">
              <input
                className="input-search"
                type="text"
                placeholder="Search your book...."
                onChange={e => this.serachBook(e.target.value)}
              />
            </div>
            <div className="table-book">
              {userInfo.role === 1 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Available</th>
                      <th>Issued to</th>
                      <th>Issued At</th>
                      <th>Issued Till</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookList.map(book => (
                      <tr key={book.bookId}>
                        <td>{book.bookName}</td>
                        <td>{book.availability ? "Yes" : "No"}</td>
                        <td>
                          {book.issuedTo === getCookie("userName")
                            ? "Me"
                            : book.issued_to}
                        </td>
                        <td>{book.issued_on}</td>
                        <td>{book.issued_till}</td>

                        <td>
                          {userInfo.assigned_book === 0 ||
                          userInfo.assigned_book === null ? (
                            book.availability ? (
                              <button
                                onClick={() => this.assignBook(book.bookId)}
                              >
                                Assign
                              </button>
                            ) : (
                              <button
                                disabled={
                                  userInfo.requestQueue.length &&
                                  userInfo.requestQueue.some(
                                    r => r === book.bookId
                                  )
                                }
                                onClick={() => {
                                  this.requestBook(book.bookId);
                                }}
                              >
                                Interested
                              </button>
                            )
                          ) : (
                            book.bookId === userInfo.assigned_book && (
                              <button
                                onClick={() => {
                                  this.returnBook(book.bookId);
                                }}
                              >
                                Return
                              </button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Available</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookList.map(book => (
                      <tr key={book.bookId}>
                        <td>{book.bookName}</td>
                        <td>{book.availability ? "Yes" : "No"}</td>
                        <td>
                          {userInfo.assigned_book === 0 ||
                          userInfo.assigned_book === null ? (
                            book.availability ? (
                              <button
                                onClick={() => this.assignBook(book.bookId)}
                              >
                                Assign
                              </button>
                            ) : (
                              <button
                                disabled={
                                  userInfo.requestQueue.length &&
                                  userInfo.requestQueue.some(
                                    r => r === book.bookId
                                  )
                                }
                                onClick={() => {
                                  this.requestBook(book.bookId);
                                }}
                              >
                                Interested
                              </button>
                            )
                          ) : (
                            book.bookId === userInfo.assigned_book && (
                              <button
                                onClick={() => {
                                  this.returnBook(book.bookId);
                                }}
                              >
                                Return
                              </button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
