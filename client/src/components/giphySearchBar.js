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
    <div
      className="gifSearchContainer"
      style={{
        width: "18.75rem",
        height: "8.5rem",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <div id="searchBar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GIFs..."
        />
      </div>
      <div className="card-container">
        <button onClick={handleSearch}>Search</button>
        <ResultList results={results} onSelectGif={handleSelectGif} />
      </div>
    </div>
  );
}

function ResultList(props) {
  return (
    <ul className="gifContainer">
      {props.results.map((result) => (
        <li
          style={{ listStyle: "none", padding: 0 }}
          className="gifItem"
          key={result.id}
          onClick={() => props.onSelectGif(result.images.original.url)}
        >
          <img
            alt={result.title}
            className="gifImg"
            src={result.images.original.url}
          />
        </li>
      ))}
    </ul>
  );
}

export default GiphySearchBar;
