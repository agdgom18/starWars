import React, { Component } from 'react';
import { Icharacter } from '../types/api';
import axios from 'axios';

interface SearchPageState {
  searchTerm: string;
  searchResults: Icharacter[];
}

class SearchPage extends Component<{}, SearchPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }
  componentDidMount() {
    this.search();
  }

  search = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    let apiUrl = 'https://swapi.dev/api/people/';
    if (trimmedSearchTerm) {
      apiUrl += `?search=${trimmedSearchTerm}`;
    }
    axios
      .get(apiUrl)
      .then((res) => {
        const searchResults = res.data.results;
        this.setState({ searchResults });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchInputChange}
          />
          <button onClick={this.search}>Search</button>
        </div>
        <div>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <h3>{result.name}</h3>
                <p>
                  Gender:
                  {result.gender}
                </p>
                <p>Height: {result.height}</p>
                <p>Mass: {result.mass}</p>
                <p>Hair Color: {result.hair_color}</p>
                <p>Birth year: {result.birth_year}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default SearchPage;
