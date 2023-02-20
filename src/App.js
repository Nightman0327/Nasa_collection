import React from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom';
import Home from './pages/home';
import Show from './pages/show';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element = {<Home />} />
        <Route exact path = "/show" element = {<Show />} />
        <Route path = '/*' element={ <Navigate replace to ="/"/> }/>
      </Routes>
    </div>
  );
}

export default App;
