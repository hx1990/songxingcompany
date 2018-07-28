import React, { Component} from 'react'
import './index.css'

import { Table,Button,Modal } from 'antd'

import axios from 'axios'
// import { log } from '../../Comment'
import Qs from 'qs'
const host =window.config.host
const log=console.log.bind(this)


let loginInfo=sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))

class StaffList extends Component{
    constructor(){
        super()
        this.state={  
          data:[
            
          ],
          visible:false,
          visible1:false
        }
        this.columns=[{
          title: '姓名',
          dataIndex: 'name',
          key:'name',
          align: 'center',
          
        }, {
          title: '部门',
          dataIndex: 'dept',
          key:'dept',
          align: 'center',
          
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key:'phone',
          align: 'center',
          
        },
        
        {
          title: '状态',
          dataIndex: 'statusMsg',
          key:'statusMsg',
          align: 'center',
        },
        {title:'审核',align:'center',render:(text, record,index)=>{
          if(text.status==3){
            return (<span>
              <Button data-id={index} onClick={this.pass.bind(this)}>通过</Button>
              <Button data-id={index} onClick={this.unPass.bind(this)}>不通过</Button>
              </span>)
          }else{
            return (<span></span>)
          }
          
        }}
      ]
    } 
    
    pass(e){
      this.setState({
        visible:true,
        index:e.target.dataset.id
      }) 
    }
    unPass(e){
      this.setState({
        visible1:true,
        index:e.target.dataset.id
      })
    }
    componentWillMount(){
      let that=this
      log(loginInfo)
      if(loginInfo){
        axios.post(host+'/admin/corp/staff/list',Qs.stringify(
          {corpId:loginInfo.corpId}
        )).then((res)=>{
          if(res.data.code==200){
            that.setState({
              data:res.data.data
            })
          }else{
            alert(res.data.message)
          }
            
        })
      }
      
      
    }
    handleOk(){
       let that=this
       let staffId=this.state.data[this.state.index].corpStaffId
       log(staffId)
       axios.post(host+'/admin/corp/approve/staff',Qs.stringify(
        {status:4,staffId}
      )).then((res)=>{
         if(res.data.code==200){
            that.setState(
              { visible:false, }
            )
            that.componentWillMount()
         }else{
           alert(res.data.message)
         }
      })
    }
    handleCancel(){
      this.setState(
        { visible:false, }
      )
    }
    handleOk1(){
      let that=this
      let staffId=this.state.data[this.state.index].corpStaffId
      axios.post(host+'/admin/corp/approve/staff',Qs.stringify(
       {status:5,staffId}
     )).then((res)=>{
        if(res.data.code==200){
           that.setState(
             { visible1:false, }
           )
           that.componentWillMount()
        }else{
          alert(res.data.message)
        }
     })
   }
   handleCancel1(){
     this.setState(
       { visible1:false, }
     )
   }
    render(){
        return(<div className="staff-list">
           <div className="topTitle">
             <span>员工列表</span>
           </div>
           <div className="body">
               <div className="resut">
                 <Table dataSource={this.state.data} columns={this.columns}></Table>
               </div>
           </div>
           <Modal title="提示" visible={this.state.visible} okText="确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
              <h2>审核通过将不能撤销，确认通过审核吗？</h2> 
          </Modal>
          <Modal title="提示" visible={this.state.visible1} okText="确认" cancelText="取消" onOk={this.handleOk1.bind(this)} onCancel={this.handleCancel1.bind(this)}>
              <h2>审核不通过将不能撤销，确认不通过审核吗？</h2> 
          </Modal>
        </div>)
    }
}
export default StaffList