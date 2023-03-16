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
  const [errMsg, setErrMsg] = useState(null);
  const [errCode, setErrCode] = useState(null);
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopicList([...topics]);
      })
      .catch((err) => {
        setErrCode(err.response.status);
        setErrMsg(err.response.data.msg);
      });
  }, []);

  console.log({ "error codes in app": { errCode, errMsg } });

  return (
    <div className="App">
      <Header setErrCode={setErrCode} setErrMsg={setErrMsg} />
      <Navigation
        topicList={topicList}
        setDescription={setDescription}
        description={description}
        setErrCode={setErrCode}
        setErrMsg={setErrMsg}
      />

      {errCode ? (
        <ErrorHandling errCode={errCode} errMsg={errMsg} />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <FrontPage
                  setDescription={setDescription}
                  setErrCode={setErrCode}
                  setErrMsg={setErrMsg}
                />
              }
            />
            <Route
              path="/articles/:article_id"
              element={
                <Article
                  user={user}
                  setErrCode={setErrCode}
                  setErrMsg={setErrMsg}
                />
              }
            />
            <Route
              path="/users/:username"
              element={<User setErrCode={setErrCode} setErrMsg={setErrMsg} />}
            />
            <Route
              path="/topics/:topic"
              element={
                <FrontPage
                  topicList={topicList}
                  setDescription={setDescription}
                  setErrCode={setErrCode}
                  setErrMsg={setErrMsg}
                />
              }
            />
            <Route
              path="*"
              element={<ErrorHandling errCode={errCode} errMsg={errMsg} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
