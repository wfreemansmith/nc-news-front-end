import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./contexts/Theme";
import { getTopics } from "./utils/api";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import LoginPopOut from "./components/LoginPopOut";
import FrontPage from "./components/FrontPage";
import Article from "./components/Article";
import User from "./components/User";
import ErrorHandling from "./components/ErrorHandling";

function App() {
  const { theme } = useContext(ThemeContext);

  const [topicList, setTopicList] = useState([]);
  const [description, setDescription] = useState("");
  const [login, setLogin] = useState(false);

  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicList([...topics]);
    });
  }, []);

  return (
    <>
    <div className={`App ` + theme} onClick={() => login ? setLogin(false) : null}>
      <Header />
      <Login setLogin={setLogin}/>
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
    {login ? <LoginPopOut setLogin={setLogin} /> : null}
    </>
  );
}

export default App;
