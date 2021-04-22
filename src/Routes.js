import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './core/Home';
import Signup from './user/Signup';
import MyOrders from './user/MyOrders';
import Signin from './user/Signin';
import Cart from './core/Cart';
export default function Routes () {

    return (
        <Router>
        <Switch>
            <Route exact path='/' component ={Home}/>

            <Route path = '/signup' exact component ={Signup}/> 
            <Route path = '/signin' exact component ={Signin}/> 
            <Route path = '/cart' exact component ={Cart}/> 
            <Route path = '/my-orders' exact component = {MyOrders}/> 
        </Switch>
        </Router>
    )

}