import { useState } from "react";
import "./Search.css";

function Search() {
  const [searchList, setSearchList] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Post");

  const resetSearch = () => {
    setSearchList(null);
    setKeyword("");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword === "") return;

    const API_URL =
      document.location.hostname === "127.0.0.1" ||
      document.location.hostname === "localhost"
        ? "http://127.0.0.1:5000/"
        : "http://35.93.49.231:5000/";
    const api = API_URL + `search/?key=${keyword}&category=${category}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.found);
        setSearchList(data.found);
      })
      .catch((error) => {
        setSearchList([]);
        console.error("Error:", error);
      });
  };

  const renderUserList = () => {
    return searchList.map((item, index) => {
      return (
        <div className="search-item" key={item.id + item.created_at}>
          <div className="search-index">{index + 1}</div>
          <div className="search-title">
            {item.name} / {item.email}
          </div>
          <div className="search-date">{item.created_at}</div>
        </div>
      );
    });
  };

  const renderPostList = () => {
    return searchList.map((item, index) => {
      return (
        <div className="search-item" key={item.id + item.created_at}>
          <div className="search-index">{index + 1}</div>
          <div className="search-title">{item.content}</div>
          <div className="search-date">{item.created_at}</div>
        </div>
      );
    });
  };

  return (
    <div className="App search-wrapper">
      <form className="form-container" onSubmit={submitSearch}>
        <select
          className="selct-box"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Post">Post</option>
          <option value="User">User</option>
        </select>
        <input
          className="input-box"
          name="keyword"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <button className="reset-button" onClick={resetSearch}>
        RESET
      </button>
      {searchList && (
        <div>
          {searchList.length === 0 ? (
            <div className="noresult">Sorry, no result found!</div>
          ) : (
            <div>
              {category === "User" && renderUserList()}
              {category === "Post" && renderPostList()}
            </div>
          )}
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Search;
