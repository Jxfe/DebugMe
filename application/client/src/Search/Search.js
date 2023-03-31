import { useState } from "react";
import "./Search.css";

const dummyData = [
  { id: 1, title: "post", created_at: "03/30/2023" },
  { id: 2, name: "user", created_at: "03/30/2023" },
  { id: 3, title: "calander", created_at: "03/30/2023" },
];

function Search() {
  const [searchList, setSearchList] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("post");

  const resetSearch = () => {
    setSearchList(null);
    setKeyword("");
  };
  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword === "") return;
    const apiURL = process.env.REACT_APP_API_URL + "/search";
    console.log(apiURL);
    setSearchList(dummyData);
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
          <option value="post">Post</option>
          <option value="user">User</option>
          <option value="calander">Calander</option>
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
              {searchList.map((item, index) => {
                return (
                  <div className="search-item" key={item.id + item.created_at}>
                    <div className="search-index">{index + 1}</div>
                    <div className="search-title">
                      {item.name ? item.name : item.title}
                    </div>
                    <div className="search-date">{item.created_at}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Search;
