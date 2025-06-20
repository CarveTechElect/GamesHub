import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Maze from './Pages/Maze';
import PicPuzzle from './Pages/PicPuzzle';
import WordPuzzle from './Pages/WordPuzzle';
import Scrabble from './Pages/Scrabble';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/maze' element={<Maze />} />
        <Route path='/wordpuzzle' element={<WordPuzzle />} />
        <Route path='/picpuzzle' element={<PicPuzzle />} />
        <Route path='/scrabble' element={<Scrabble />} />
      </Routes>
    </Router>
  )
}

export default App
