import React from 'react';
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import Admin from '../admin/admin';
import Menu from './menu';


export const Accueil = (props) => {
    return (
     <div>
         <Menu/>
     </div>
    )
}

export default Accueil;