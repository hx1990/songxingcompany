import React, { Component } from 'react';
import {
    Router,
    Route,
    NavLink,
    
  } from 'react-router-dom';

 import createHistory from 'history/createHashHistory'

import "./index.css"

//引入icon图片
import userUrl from "../../img/user.png"


//引入组件

 
 import StaffList from '../StaffList'
 import StaffAudit from '../StaffAudit'
 import RunningWater from '../RunningWater'
 import HistoryBill from '../HistoryBill'
 import OutstandingOrder from '../OutstandingOrder'
 import ApplySettlement from '../ApplySettlement'
 import GetCode from '../GetCode'
 import Apply from '../Apply'
 
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

 const history = createHistory()
const log=console.log.bind(this)
class Main extends Component{
    constructor(...agrs){
        super(...agrs)
        this.state={
        }
        log()
    }
   
    render(){
        return(<div className="nav">
            <Router history={history}> 
                <div className="routerWrap" > 
                    <ul className="linkList"> 
                        <li>
                            <NavLink activeClassName="activeRoute" to="/companyHost/apply">
                              <img alt='img' src={userUrl}/>
                              <span>企业申请</span>
                            </NavLink>
                        </li>

                        
 
                        <li>
                            <NavLink activeClassName="activeRoute" to="/companyHost/runningWater">
                               <img alt='img' src={userUrl}/>
                               <span >快递流水</span>
                            </NavLink>
                        </li>
                         
                         <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon style={{ fontSize: 20, color: '#fff' }} type="appstore" /><span>员工管理</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/companyHost/staffList">
                                       <Menu.Item key="5" className="subtitle">员工列表</Menu.Item>
                                    </NavLink>
                                     <NavLink activeClassName="activeRoute" to="/companyHost/staffAudit">
                                       <Menu.Item key="6" className="subtitle">员工审核</Menu.Item>
                                    </NavLink> 
                                </SubMenu>
                            </Menu>  
                        </li>
                        
                        <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon style={{ fontSize: 20, color: '#fff' }} type="appstore" /><span>结算</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/companyHost/historyBill">
                                       <Menu.Item key="5" className="subtitle">历史账单</Menu.Item>
                                    </NavLink>
                                     <NavLink activeClassName="activeRoute" to="/companyHost/outstandingOrder">
                                       <Menu.Item key="6" className="subtitle">未支付账单</Menu.Item>
                                    </NavLink> 
                                </SubMenu>
                            </Menu>  
                        </li>
                        
                        <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon style={{ fontSize: 20, color: '#fff' }} type="appstore" /><span>企业资料</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/companyHost/applySettlement">
                                       <Menu.Item key="5" className="subtitle">申请结算</Menu.Item>
                                    </NavLink>
                                     <NavLink activeClassName="activeRoute" to="/companyHost/getCode">
                                       <Menu.Item key="6" className="subtitle">企业二维码</Menu.Item>
                                    </NavLink> 
                                </SubMenu>
                            </Menu>  
                        </li>
                    </ul> 
                    <Route exact path="/companyHost/"  component={Apply}/> 
                    <Route path="/companyHost/apply"  component={Apply}/>
                    
                    <Route path="/companyHost/staffAudit" component={StaffAudit}/>
                    <Route path="/companyHost/staffList" component={StaffList}/>
                    <Route path='/companyHost/runningWater' component={RunningWater}/>
                    <Route path='/companyHost/historyBill' component={HistoryBill}/>
                    <Route path='/companyHost/outstandingOrder' component={OutstandingOrder}/>
                    <Route path='/companyHost/applySettlement' component={ApplySettlement}/>
                    <Route path='/companyHost/getCode' component={GetCode}/>
                    
                </div>
            </Router>
        </div>)
    }
}

export default Main