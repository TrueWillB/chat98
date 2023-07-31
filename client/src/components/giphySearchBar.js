import React, { useState } from "react";
import search from "../utils/API";

function GiphySearchBar(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      search(query)
        .then((response) => setResults(response.data.data))
        .catch((err) => console.log(err));
    }
  };
  const handleSelectGif = (url) => {
    props.onSelectGif(url);
    setResults([]);
    setQuery("");
  };
  return (
    <div id="searchBar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GIFs..."
      />
      <button onClick={handleSearch}>Search</button>
      <ResultList results={results} onSelectGif={handleSelectGif} />
    </div>
  );
}

function ResultList(props) {
  return (
    <ul className="list-group">
      {props.results.map((result) => (
        <li
          className="list-group-item"
          key={result.id}
          onClick={() => props.onSelectGif(result.images.original.url)}
        >
          <img
            alt={result.title}
            className="img-fluid"
            src={result.images.original.url}
          />
        </li>
      ))}
    </ul>
  );
}

export default GiphySearchBar;
