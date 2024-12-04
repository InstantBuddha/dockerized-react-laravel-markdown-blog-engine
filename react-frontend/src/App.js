import "./App.css";
import "../src/styles/global-styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import BlogPost from "./components/BlogPost";

function App() {
  return (
    <div className="App">
      <h1>Dockerized React Markdown Blog App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
