import React from 'react'
import { Form, Icon, Input, Button } from 'antd'

import axios from 'axios'
import Qs from 'qs'
import './index.css'


const FormItem = Form.Item;
const log=console.log.bind(console)
const host =window.config.host

class NormalLoginForm extends React.Component {
  
  constructor(...args){
    super(...args)
    this.state={
       t:0,
       click:true
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data={
          loginPhone:values.userName,
          code:values.password
        }
        axios.post(host+'/admin/corp/login',Qs.stringify(data)).then((res)=>{
            log(res)
            if(res.data.code===200){
              this.props.msg(res.data.data.status)
              // window.location.replace("#/companyHost/apply/reg")
              window.sessionStorage.setItem('loginInfo', JSON.stringify(
                res.data.data
              ))
              window.location.reload()
            }else{
              alert(res.data.message)
            }
        })
        
      }
    });
  }
  
  getCode(){
    log(this.props.history)
    let that=this
    let tim=60
    let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
    this.props.form.validateFields((err, values) => {
      if(myreg.test(values.userName)){
         if(!this.state.click){
          return false
        }
        axios.get(host+'/admin/corp/apply/code?loginPhone='+values.userName).then((res)=>{
            log(res)
        })
        let timer=setInterval(()=>{
          tim--
          if(tim<0){
              tim=60
              that.setState({
                click:true,
                t:0
              })
              clearInterval(timer)
          }else{
            that.setState({
              t:tim,
              click:false
            })
          }
        },1000)
      }else{
        alert('你输入电话号码有误，请重新输入！')
        return false
      }
    })
    
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logi">
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <h3>宋信智递企业管理后台</h3>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '输入手机号!' }],
          })(<div>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="手机号" />
            <div className='time'>
            <Button style={this.state.click?{background:'rgb(24,144,255)',color:'#fff'}:{background:'#ccc',color:'#fff'}} onClick={this.getCode.bind(this)}>
             获取验证码
            </Button>
            <span style={this.state.t>0?{display:'block'}:{display:'none'}}>{this.state.t}秒</span>
            </div>
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入验证码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="验证码" />
          )}
        </FormItem>
        <FormItem>
          
    
            <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
         

        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);



export default Login
