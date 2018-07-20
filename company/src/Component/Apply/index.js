import React, { Component } from 'react'
import { Steps, Icon } from 'antd'

import './index.css'

  
  import Login from '../Login'
  import Reg from '../Reg'
  const Step = Steps.Step
  
  class Apply extends Component{
    constructor(){
        super()
        this.state={
        }
    }
    render(){
        return(<div className="apply">
        <Steps>
            <Step status="finish" title="手机验证登录" icon={<Icon type="user" />} />
            <Step status="wait" title="企业申请" icon={<Icon type="solution" />} />
            <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
        </Steps>
        {/* <Login/> */}
        <Reg/>
        </div>)
    }
    
  }
  export default Apply