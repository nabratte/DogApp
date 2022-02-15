import {Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage';
import React from 'react';
import Home from './components/Home';
import DogCreator from './components/DogCreator'
import Details from './components/Detail';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path='/dog' element={<DogCreator/>}/>
          <Route exact path="/details/:id" element={<Details/>}/>
        </Routes>
    </div>
  );
}

export default App;
