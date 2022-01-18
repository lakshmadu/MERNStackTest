import React from 'react';

import './App.css';
import Headerdiv from './component/header/Headerdiv';
import Navbar from './component/header/Navbar';
//import Home from './component/home/Home';
import RecipeAdd from './component/home/RecipeAdd';
import RecipeList from './component/home/RecipeList';




function App() {
  return (
    <div className="App">
      <Navbar/>
      <Headerdiv/>
      <RecipeAdd/>
      <RecipeList/>
      
      
    </div>
  );
}

export default App;
