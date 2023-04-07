import "./App.css";
import Post from "./Components/Post";
import Search from "./Components/Search";

function Home() {
  return (
    <div className="App">
      <h1>DebugMe</h1>
      <Search />
      <Post />
    </div>
  );
}

export default Home;
