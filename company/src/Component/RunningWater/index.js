import React, {Component} from 'react'
import { Table,Select,Input} from 'antd'
import "./index.css"
import Qs from 'qs'
import axios from 'axios'
const log=console.log.bind(console)
const Option=Select.Option
const Search=Input.Search



class RunningWater extends Component{
    constructor(){
        super()
        this.state={
          data :[]
        }
        this.express=[
            // { title: 'ID',  dataIndex: 'ID',  key: 'ID', align:'center' },
            { title: '订单号',  dataIndex: 'orderNo', align:'center', key: 'orderNo', },
             
            { title: '支付时间',   dataIndex: 'payTime',align:'center',  key: 'payTime', },
            { title: '微信昵称',  dataIndex: 'wxName',width:'10%',align:'center',  key: 'wxName', }, 
           
            { title: '购买张数',  dataIndex: 'num', align:'center', key: 'num', },
            { title: '支付金额',  dataIndex: 'payMoney', align:'center', key: 'payMoney', },
            { title: '机柜编号',  dataIndex: 'cabinetNo', align:'center', key: 'cabinetNo', },
            { title: '出票状态',  dataIndex: 'statusMessage', align:'center',key:'statusMessage'}
      ]
    }
    componentWillMount(){
          let that=this
      axios.post(window.config.host+'/admin/finance/order/list', Qs.stringify({
            status:5
      })).then(function (res) {
            log('成功',res)
            that.setState({
                  data:res.data.data
            })
      }) 
    }
    renZheng(e){
      log(e)
    }
    payStatus(e){
          let that=this
      axios.post(window.config.host+'/admin/finance/order/list', Qs.stringify({
            status:e
      })).then(function (res) {
            log('成功',res)
            that.setState({
                  data:res.data.data
            })
      }) 
    }
    render(){
        return (<div className="express">
          <div className="DetailList">快递流水表</div>
          {/* <div className="shaxuan">
              
              
              <Select defaultValue="支付状态" style={{ width: 120 }} onSelect={this.payStatus.bind(this)}>
                   
                    <Option value="3">已支付</Option>
                   
                    <Option value="5">已出票</Option>
              </Select>
              
              
              
          </div> */}
          <Table columns={this.express} dataSource={this.state.data} />
          
        </div>)
    }
}
export default RunningWater