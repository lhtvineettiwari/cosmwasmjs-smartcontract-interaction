import { ChainInfo } from './components/ChainInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<ChainInfo/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
