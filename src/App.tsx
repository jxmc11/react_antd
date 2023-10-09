import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";

type dogDataType = {
  message: string
}
function App() {
  const position = useMousePosition();
  const [data, dogLoading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [])
  const dogData = data as dogDataType
  return (
    <div className="App">
      <header className="App-header">
        <Hello message="nihao" />
        <LikeButton />
        <MouseTracker />
        {
          dogLoading ? <h2>loading</h2>
          : <img src={dogData && dogData.message} alt="" />
        }
        <p>
          hooks: x: {position.x}, y: {position.y}
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
