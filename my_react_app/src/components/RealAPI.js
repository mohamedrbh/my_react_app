import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

function RealAPI() {
  return <MainComponent />;
}

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

// arrow function expression
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.setSearchStories = this.setSearchStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = { hits: this.state.result.hits.filter(isNotId) }; // make the objt in Object.assign
    this.setState({
      result: Object.assign({}, this.state.result, updatedHits)
    });
    // this.setState({ result: { ...this.state.result, hits: updatedHits } });
  }

  setSearchStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchStories(result))
      .catch(error => error);
  }
  render() {
    const { result, searchTerm } = this.state;
    // if (!result) {
    //   return null;
    // } // conditional rendering there is alot of ways to do conditional rendering
    return (
      <div>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        {result ? (
          <Table list={result.hits} onDismiss={this.onDismiss} />
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
}

// Functional stateless component declaration for Search component
function Search({ value, onChange, onSubmit, children }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <div class="input-group my-3">
          <input
            className="form-control form-control-lg"
            type="text"
            value={value}
            onChange={onChange}
          />
          <div class="input-group-append">
            <button className="btn btn-outline-info" type="submit">
              {children}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// Function stateless component for Table component

function Table({ list, pattern, onDismiss }) {
  return (
    <div className="container">
      {list.map(item => (
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
            onClick={() => onDismiss(item.objectID)}
            className="btn btn-outline-danger"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

export default RealAPI;
