import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import FrontPage from "./components/FrontPage";
import Article from "./components/Article";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [topicList, setTopicList] = useState([{ slug: "", description: "Frontpage headlines" }]);
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  return (
    <div className="App">
      <Header />
      <Navigation setTopicList={setTopicList} topicList={topicList} />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
        <Route path="/users/:username" element={<FrontPage />} />
        <Route path="/:topic" element={<FrontPage topicList={topicList} />} />
      </Routes>
    </div>
  );
}

export default App;
