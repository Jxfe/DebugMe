import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const base_url = "http://52.41.50.55:5000";
  //const base_url = "http://localhost:5000";
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

  const handleNewUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/users`, newUser);
      setNewUser({ name: "", email: "" });
      setSuccessMessage("User added successfully!");
    } catch (error) {
      setErrorMessage("An error occurred while adding the user." + error);
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
      <h2>Add User</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form className="add-user-form" onSubmit={handleNewUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <button className="add-user-button" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
}

export default App;