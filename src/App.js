import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import FrontPage from "./components/FrontPage";
import Article from "./components/Article";
import User from "./components/User";
import ErrorHandling from "./components/ErrorHandling";
import { getTopics } from "./utils/api";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [topicList, setTopicList] = useState([]);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicList([...topics]);
    });
  }, []);

  // set state for errors locally in each component, that way it mounts and re-mounts without needing reset the whole thing to get rid of the error

  return (
    <div className="App">
      <Header />
      <Navigation
        topicList={topicList}
        setDescription={setDescription}
        description={description}
      />
      <Routes>
        <Route
          path="/"
          element={<FrontPage setDescription={setDescription} />}
        />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
        <Route path="/users/:username" element={<User />} />
        <Route
          path="/topics/:topic"
          element={
            <FrontPage topicList={topicList} setDescription={setDescription} />
          }
        />
        <Route path="/error" element={<ErrorHandling />} />
        <Route path="*" element={<ErrorHandling />} />
      </Routes>
    </div>
  );
}

export default App;
