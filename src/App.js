import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./contexts/Theme";
import { getTopics } from "./utils/api";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import LoginPopOut from "./components/LoginPopup/LoginPopOut";
import FrontPage from "./components/FrontPage";
import Article from "./components/Article";
import User from "./components/User";
import ErrorHandling from "./components/ErrorHandling";

function App() {
  const { theme } = useContext(ThemeContext);

  const [topicList, setTopicList] = useState([]);
  const [description, setDescription] = useState("");
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicList([...topics]);
    });
  }, []);

  return (
    <>
    <div className={`App ` + theme} onClick={() => popUp ? setPopUp(false) : null}>
      <Header />
      <Login setPopUp={setPopUp}/>
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
        <Route path="/articles/:article_id" element={<Article setPopUp={setPopUp}/>} />
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
    {popUp ? <LoginPopOut setPopUp={setPopUp} /> : null}
    </>
  );
}

export default App;
