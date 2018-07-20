import React, { Component } from 'react'
import './index.css'
import ExpressDoorUrl from "../../img/logo1.png"
import { Table} from 'antd'

import axios from 'axios'
// import { log } from '../../Comment'
import Qs from 'qs'
const host =window.config.host



  
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key:'name',
    align: 'center',
    
  }, {
    title: '部门',
    dataIndex: 'price',
    key:'price',
    align: 'center',
    
  },
  {
    title: '电话',
    dataIndex: 'size',
    key:'size',
    align: 'center',
    
  },
  
  {
    title: '状态',
    dataIndex: 'statusMsg',
    key:'statusMsg',
    align: 'center',
  },
  
//   {
//     title: '产品图片',
//     dataIndex: 'img',
//     align: 'center',
//     render: (text, record,index) =>{
//         return (<img className="product-img" src={record&&record.img}/>)
//     }
//   }]
]
class StaffList extends Component{
    constructor(){
        super()
        this.state={
          columns,
          data:[]
        }
    } 
    componentWillMount(){
      let that=this
      axios.post(host+'/admin/goods/list',Qs.stringify(
          {status:1}
      )).then((res)=>{
          that.setState({
            data:res.data.data
          })
      })
    }
    render(){
        return(<div className="staff-list">
           <div className="topTitle">
             <span>员工列表</span>
           </div>
           <div className="body">
               <div className="resut">
                 <Table dataSource={this.state.data} columns={this.state.columns}></Table>
               </div>
               
           </div>
        </div>)
    }
}
export default StaffList