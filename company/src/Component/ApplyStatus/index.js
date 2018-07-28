import React,{Component} from 'react'
import {Button,Input} from 'antd'
import axios from 'axios'
import Qs from 'Qs'
import './index.css'
const log=console.log.bind(console)
let loginInfo=sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))
class ApplyStatus extends Component {
    constructor(...agrs){
        super(...agrs)
        this.state={
            codeUrl:'',
            dept:''
        }
    }
    getCode(){
        this.setState({
            codeUrl:window.config.adminHost+'/admin/code/corp?corpLoginPhone='+loginInfo.loginPhone 
          },()=>{
              log(this.state.codeUrl)
          }) 
        
    } 
    addDept(e){
        log(e.target.value)
        this.setState({
            dept:e.target.value, 
            
        })
    } 
    addDepartment(){
        axios.post(window.config.host+'/admin/corp/add/dept',Qs.stringify({
             dept:this.state.dept
        })).then((res)=>{
            if(res.data.code==200){
                log(res.data.data)
            }else{
                alert(res.data.message)
            }
        })
        
    }  
    render(){
       return (<div className='apply-status'>
           <div className='left-info'>
               <h5>企业申请信息</h5>
               <div className='item'>
                   <span>企业名称：</span><span>{loginInfo&&loginInfo.corpName}</span>
               </div>
               <div className='item'>
                   <span>登录电话：</span><span>{loginInfo&&loginInfo.loginPhone}</span>
               </div>
               <div className='item'>
                   <span>审核状态：</span><span>{loginInfo&&loginInfo.statusMsg}</span>
               </div>
           </div>
          <div className="rigth-function" style={loginInfo&&loginInfo.status==4?{display:'block'}:{display:'none'}}>
                <div className='item' style={this.state.codeUrl?{height:'400px'}:{}}>
                    <Button onClick={this.getCode.bind(this)}>生成二维码</Button>
                      <img className={this.state.codeUrl?'img':''} src={this.state.codeUrl} alt=''/>
                    <Button>复制图片</Button>
                </div>
                <div className='item1'>
                    <span>添加部门：</span>
                    <Input onInput={this.addDept.bind(this)} placeholder="请输入要添加的部门" />
                    <Button onClick={this.addDepartment.bind(this)}>添加</Button>
                </div>
          </div>
       </div>)
    }
}
export default ApplyStatus