import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FrontPage from './components/FrontPage';
import Article from './components/Article';
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';

function App() {
const [topic, setTopic] = useState("")


  return (
    <div className="App">
      <Header />
      <Navigation setTopic={setTopic}/>
      <Routes>
        <Route path='/' element={<FrontPage topic={topic}/>} />
        <Route path='/articles/:article_id' element={<Article/>} />
        <Route path='/users/:username' element={<FrontPage/>} />
       </Routes>
    </div>
  );
}

export default App;
