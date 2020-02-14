import React from 'react';
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import './App.css';
import Accueil from './general/accueil';
import Menu from './general/menu';
import Admin from './admin/admin';

function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Menu />
        <Route exact path='/' component={Accueil} />
        <Route path='/admin' component={Admin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
