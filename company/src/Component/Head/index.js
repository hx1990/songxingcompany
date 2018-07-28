import React,{Component} from 'react'
import logo from '../../img/logo2.png'
import {Icon} from 'antd'
import './index.css'
class Head extends Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(<div className='head'>
        <div className='left'>
         <img alt='' src={logo}/>
         <span>宋信智递企业管理平台</span>
        </div>
         <div className='right'>
             <div className='itme'>
             <Icon type="user-add" style={{ fontSize: 26, color: '#fff' }} />
                 <span>用户:</span>
             </div>
             <div className='itme'>
             <Icon type="home" style={{ fontSize: 24, color: '#fff' }} />
                 <span>首页</span>
             </div>
             <div className='itme'>
             <Icon type="sync" style={{ fontSize: 24, color: '#fff' }} />
                 <span>刷新</span>
             </div>
             <div className='itme'>
             <Icon type="poweroff" style={{ fontSize: 24, color: '#fff' }} />
                 <span>退出</span>
             </div>
         </div>
        </div>)
    }
}
export default Head