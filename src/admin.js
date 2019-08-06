import React, { Component } from "react";
import raw from "./apiService";
import { getCookie, removeCookies } from "./util";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    raw
      .post("http://172.19.4.39:4000/book/getBooks", {
        id: getCookie("userName")
      })
      .then(r => {
        this.setState({ books: r });
      });
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <div>
          <button
            onClick={() => {
              removeCookies();
              this.props.history.push("/");
            }}
          >
            Sign Out
          </button>
        </div>
        <div>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Available</th>
              <th>Issued to</th>
              <th>Issued At</th>
              <th>Issued Till</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.bookName}>
                <td>{book.bookName}</td>
                <td>{book.availability ? "Yes" : "No"}</td>
                <td>{book.issuedTo}</td>
                <td>{book.issuedAt}</td>
                <td>{book.issuedTill}</td>

                <td>{book.availability && <button>Assign</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}