import "./styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import ScrollToTop from "./components/ScrollToTop";
import Transition from "./components/Transition";
import { AnimatePresence } from "framer-motion";
import TopButton from "./components/TopButton";

function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

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
      <Transition option={"fade"}>
        <div
          className={`App ${theme}background ${theme}`}
          onClick={() => (popUp ? setPopUp(false) : null)}
          id="top"
        >
          <Header />
          <Login setPopUp={setPopUp} />
          <Navigation
            topicList={topicList}
            setDescription={setDescription}
            description={description}
          />
          <AnimatePresence mode="wait">
            <Routes key={location.pathname + location.search} location={location}>
              <Route
                path="/"
                element={<FrontPage setDescription={setDescription} />}
              />
              <Route
                path="/articles/:article_id"
                element={<Article setPopUp={setPopUp} />}
              />
              <Route path="/users/:username" element={<User />} />
              <Route
                path="/topics/:topic"
                element={
                  <FrontPage
                    topicList={topicList}
                    setDescription={setDescription}
                    description={description}
                  />
                }
              />
              <Route path="/error" element={<ErrorHandling />} />
              <Route path="*" element={<ErrorHandling />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Transition>
      <TopButton />
      <ScrollToTop />
      <AnimatePresence>
        {popUp ? <LoginPopOut popUp={popUp} setPopUp={setPopUp} /> : null}
      </AnimatePresence>
    </>
  );
}

export default App;
