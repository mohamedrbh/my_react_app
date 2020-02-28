import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "css",
    url: "https://css-tricks.com/understanding-react-setstate/",
    author: "Kingsley Silas",
    num_comments: 1,
    points: 4,
    objectID: 2
  }
];

function App() {
  return (
    <div>
      <h1>Hello world!!</h1>
      <LocalState />
      <ExplainBindingsComponent />
    </div>
  );
}

// fuction expression
// function isSearched(searchTerm) {
//   return function(item) {
//     return item.title.toLowerCase().include(searchTerm.toLowerCase());
//   }
// }

// arrow function expression
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
class LocalState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list, // Instead of ---list: list---
      searchTerm: ""
    };
    this.onDismiss.bind(this); //(this.onDismiss = this.onDismiss.bind(this);) dismiss work even without bind
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    console.log(this);

    const isNtoId = item => {
      return id !== item.objectID;
    };
    const updatedList = this.state.list.filter(isNtoId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="TestLocalState">
        <form>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Title"
            onChange={this.onSearchChange}
          ></input>
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => (
          <div
            className="col p-4 d-flex flex-column position-static"
            key={item.objectID}
          >
            <span className="mb-0">{item.title}</span>
            <span className="card-text mb-auto">{item.author}</span>
            <a href={item.url} className="alert-link">
              {item.url}
            </a>
            <button
              type="button"
              onClick={() => this.onDismiss(item.objectID)}
              className="btn btn-primary"
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    );
  }
}

class ExplainBindingsComponent extends Component {
  constructor(props) {
    super(props);
    this.onClickMe = this.onClickMe.bind(this); // without binding we get undefined
  }
  onClickMe() {
    console.log(this);
  }
  render() {
    return (
      <button onClick={this.onClickMe} type="button">
        Click Me
      </button>
    );
  }
}

export default App;