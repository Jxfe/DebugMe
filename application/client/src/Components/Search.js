import { useState } from "react";
import "./style.css";
import axios from "axios";
import { SEARCH_URL } from "../utils/url";

function Search() {
  const [searchList, setSearchList] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Post");

  const resetSearch = () => {
    setSearchList(null);
    setKeyword("");
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    if (keyword === "") return;

    try {
      const url = `${SEARCH_URL}key=${keyword}&category=${category}`;
      const res = await axios(url);
      console.log(res);
      setSearchList(res.data.found);
    } catch (e) {
      setSearchList([]);
      console.log(e);
    }
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
      <button className="button" onClick={resetSearch}>
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
