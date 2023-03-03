import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <h1>Hello! We are Team EGG</h1>
      <div>
        <h2>[ Members ]</h2>
        <ul>
          <li>
            <Link to="/about/emilee">Emilee</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/jiji">Jiji</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/cris">Cris</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/matt">Matt</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/hayat">Hayat</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/jeff">Jeff</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/hector">Hector</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
