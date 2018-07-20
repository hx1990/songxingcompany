import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';

import './navList.css'
//引入组件




class NavList extends Component {
  constructor(){
    super()
    this.state={}
    console.log(this.props)
  }
  routeClick(e){
    console.log(e)
  }
  render() {
    return (
      <div className="navlsit">
        <div className='nav'>
            <ul>
              <li><NavLink  activeClassName="activeRoute1"  to="/CompanyHost">企业平台</NavLink></li>
              <li><NavLink activeClassName="activeRoute1" replace to='/about'>关于宋信</NavLink></li>
              <li><NavLink activeClassName="activeRoute1" replace to='/function'>宋信功能</NavLink></li>
              <li><NavLink activeClassName="activeRoute1" replace to='/service'>宋信服务</NavLink></li>
            </ul>   
        </div>
      </div>
    );
  }
}

export default NavList;
