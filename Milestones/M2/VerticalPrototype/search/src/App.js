import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const base_url = "http://35.93.49.231:5000";

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${base_url}/users?search=${searchQuery}`
      );
      setUsers(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("An error occurred while fetching users.");
    }
  };

  return (
    <div className="wrapper">
      <h1>User Search</h1>
      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-box"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        {users &&
          (users.length > 0 ? (
            users.map((user) => (
              <div className="search-item" key={user.id}>
                {user.name} ({user.email})
              </div>
            ))
          ) : (
            <div className="noresult">Sorry, no result found!</div>
          ))}
      </div>
    </div>
  );
}

export default App;
