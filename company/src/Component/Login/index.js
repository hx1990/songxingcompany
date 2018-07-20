import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import Qs from 'qs'
import './index.css'
const FormItem = Form.Item;
const log=console.log.bind(console)
const host =window.config.host
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let that=this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        
        axios.post(host+'/admin/user/login', Qs.stringify({
          phone:values.userName,
          password:values.password
        }),{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }).then(res=>{
        log('历史',window.location)
        window.location.replace("#/companyHost")
        if(res.data.code===200){
          let loginInfo={
              load:true,
              bshow:false,
              name:res.data.data.name
          }
           
          log(res.data.data)
          // that.props.msg(loginInfo)
          log(that.props.location)
          
        }else{
          alert(res.data.message)
        }
        
      })
        
        
      }
    });
  }
  constructor(){
    super()
    this.state={
    
    }
    
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logi">
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <h3>宋信智递企业管理后台</h3>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入用户密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          
          {/* <NavLink to="/companyHost"> */}
            <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
          {/* </NavLink> */}

          <NavLink to="/reg" className='reg'>
            <Button type="primary" htmlType="submit" className="reg-form-button">注册</Button>
          </NavLink>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);



export default Login
