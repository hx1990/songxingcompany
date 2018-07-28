import React, { Component } from 'react'
import { Steps, Icon } from 'antd'
import './index.css'
import Login from '../Login'
import Reg from '../Reg'
import Protocol from '../Protocol'
import ApplyStatus from '../ApplyStatus'

const Step = Steps.Step
const log=console.log.bind(console)
let loginInfo=sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))
log('loginInfo',loginInfo)

class Apply extends Component{
constructor(...args){
    super(...args)
    // if(loginInfo){
    //     if(loginInfo.status==1){ //登陆成功，未注册（展示注册页面）
    //         this.state={
    //             showLogin:false,
    //             statusReg:'wait',
    //             showReg:true,
    //             statusProtocal:'wait',
    //             showProtocal:false
    //         }
    //     }else if(loginInfo.status==3){//日结申请成功，待审核（展示申请状态和申请信息）
    //         this.state={
    //             showLogin:false,
    //             statusReg:'finish',
    //             showProtocal:false,
    //             statusProtocal:'wait',
    //             showProtocal:false
    //         }
    //     }else if(loginInfo.status==2){//月结申请成功，待提交协议（展示上传协议页面）
    //         this.state={
    //             show:false,
    //             status:'finish',
    //             showProtocal:false
    //         }
    //     }
        
        
    // }else{
    //     this.state={
    //         show:true,
    //         status:'wait',
    //         showProtocal:false
    //     }
    // }
    this.state={
        show:false,
        status:'wait',
        showProtocal:true
    }
}
fnCallBack(a){
    this.setState({
        show:false,
        status:'finish',
    })
}

render(){
    return(<div className="apply">
       {/* <div style={(loginInfo&&loginInfo.status)<=3?{display:'none'}:{display:'block'}}>
            <Steps>
                <Step status="finish" title="手机验证登录" icon={<Icon type="user" />} />
                <Step status={this.state&&this.state.status} title="企业申请" icon={<Icon type="solution" />} />
                <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
            </Steps>
        </div> */}
        {/* 登录 */}
        <div style={loginInfo?{display:'none'}:{display:'block'}}>  
            <Login  msg={this.fnCallBack.bind(this)}/>
        </div>

        {/* 注册 */}
        <div style={(loginInfo&&loginInfo.status)===1?{display:'block'}:{display:'none'}}>
            <Reg msg={this.state.phone}/> 
        </div>

        {/* 协议 */}
        <div style={(loginInfo&&loginInfo.status)===2?{display:'block'}:{display:'none'}}>
            <Protocol/> 
        </div>

        {/* 申请状态页面*/}
        <div style={(loginInfo&&loginInfo.status)>=3?{display:'block'}:{display:'none'}}>
            < ApplyStatus/> 
        </div>
        
    </div>)
}

}
export default Apply