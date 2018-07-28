import React, { Component } from 'react';
import './App.css';
import {
  Router,
 Route,
 
} from 'react-router-dom';

import createHistory from 'history/createHashHistory'
import Home from './Component/Home'

import Reg from './Component/Reg'

import CompanyHost from './Component/CompanyHost'


import About from './Component/About'
import Login from './Component/Login'
import Function from './Component/Function'
import Service from './Component/Service'



import {rem} from './js'
 const history = createHistory()
rem()
class App extends Component {
 
  render() {
    return (
      <Router history={history}>
            <div className='App'>
                  <Route exact path='/' component={Home}/>
                  <Route path='/about' component={About}/>
                  <Route path="/Login" component={Login}/>
                  <Route path='/function' component={Function}/>
                  <Route path='/service' component={Service}/>
                  <Route path='/reg' component={Reg}/>
                  <Route path='/companyHost' component={CompanyHost}/>
            </div>
     </Router> 
    );
  }
}

export default App;
