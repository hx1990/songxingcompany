
import React from 'react'
import { Input, Select,Upload,Icon,Button} from 'antd';
import './index.css'
import axios from 'axios'
import {citylist} from '../../Common'

const Option = Select.Option;
const log=console.log.bind(console)
const host =window.config.host
log(citylist)
let loginInfo=sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))

class Reg extends React.Component {
  constructor(...args){
    super(...args)
  }
  mode1={
    action: 'https://www.songxingde.cn:443/upload/picture',
    onChange({ file}) {
      if(file.status==="done"){
        this.setState({
          show1:false,
          idCardDownUrl:file.response.data
        })
      }
    },
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    provice:[],
    cityList:[],
    areaList:[],
    cityIndex:0,
    proviceIndex:0,
    areaIndex:0,
    payWay:1,
    loginPhone:loginInfo&&loginInfo.loginPhone||'',
    corpAddress:'',
    corpName:'',
    corpTel:'',
    legalCardDown:'',
    legalCardUp:'',
    legalName:'',
    legalPhone:'',
    license:'',
    detail:'',
  };

  submit(){
    let address=citylist[this.state.proviceIndex].name+citylist[this.state.proviceIndex].city[this.state.cityIndex].name+citylist[this.state.proviceIndex].city[this.state.cityIndex].area[this.state.areaIndex]
         let values={
          corpAddress:address+this.state.detail,
          corpName:this.state.corpName,
          corpTel:this.state.corpTel,
          legalCardDown:'',
          legalCardUp:'',
          legalName:this.state.legalName,
          legalPhone:this.state.legalPhone,
          license:'',
          payWay:this.state.payWay,
          loginPhone:this.state.loginPhone,
         }
         log(values)
        axios.post(host+'/admin/corp/post/info',values).then((res)=>{
            if(res.data.code==200){
              if(values.payWay==1){
                values.status=3
              }else if(values.payWay==2){
                values.status=2
              }
              window.sessionStorage.setItem('loginInfo', JSON.stringify(
                values
              ))
              window.location.reload()
            }else{
              alert(res.data.message)
            }
        })
  }
  selecitCity(e){
    let area=citylist[this.state.proviceIndex].city[e].area
    let areaList=[]
    area.forEach((key,index)=>{
      areaList.push(<Option value={index}>{key}</Option>)
    })
    this.setState({
      areaList,
      cityIndex:e,
      areaIndex:0
    })
  }
  selectProvice(e){
    let city=citylist[e].city
    let cityList=[]
    city.forEach((key,index)=>{
      cityList.push(<Option value={index}>{key.name}</Option>)
    })
    
    this.setState({
      cityList,
      cityIndex:0,
      proviceIndex:e,
      areaIndex:0,
      areaList:[]
    })
  }
  selectArea(e){
   
    this.setState({
      areaIndex:e
    })
  }
  componentWillMount(){
    let provice=[]
    citylist.forEach((key,index)=>{
      provice.push(<Option value={index}>{key.name}</Option>)
    })
    this.setState({
      provice
    })
  }
  settlement(e){
    this.setState({
      payWay:e
    })
  }
  addcorpName(e){
    log(e.target.value)
    this.setState({
      corpName:e.target.value
    })
  }
  addcorpTel(e){
    this.setState({
      corpTel:e.target.value
    })
  }
  addlegalName(e){
    this.setState({
      legalName:e.target.value
    })
  }
  addlegalPhone(e){
    this.setState({
      legalPhone:e.target.value
    })
  }
  addDetail(e){
    this.setState({
      detail:e.target.value
    })
  }
  render() {
    return (
        <div className="reg">
        <h2>企业结算申请</h2>
        <div className="wrapmsg">
               <div className="item">
                   <div className="subitem">
                      结算方式：
                      <Select defaultValue="日结" style={{ width: 120 }} onChange={this.settlement.bind(this)}>
                      <Option value="1">日结</Option>
                      <Option value="2">月结</Option>
                      </Select>
                    </div> 
               </div>
               <div className="item">
                     <div className="subitem">企业名称：<Input className="width140" onInput={this.addcorpName.bind(this)}  placeholder="输入企业名称" /></div> 
               </div>
               <div className="item">
                   <div className="subitem">企业地址：<Select defaultValue="省" style={{ width: 120 }} onChange={this.selectProvice.bind(this)}>
               {this.state.provice}
            </Select>
            <Select defaultValue="市" style={{ width: 120 }} onChange={this.selecitCity.bind(this)}>
            {this.state.cityList}
            </Select>
            <Select defaultValue="区" style={{ width: 120 }} onChange={this.selectArea.bind(this)}>
               {this.state.areaList}
            </Select></div>         
               </div>
               
               <div className="item">
                   <div className="subitem">企业详细地址：<Input className="width140" onInput={this.addDetail.bind(this)}  placeholder="输入企业详细地址" /></div>         
               </div>

               <div className="item">
                   <div className="subitem">企业电话：<Input className="width140" onInput={this.addcorpTel.bind(this)} placeholder="输入企业电话" /></div>         
               </div>

               <div className="item">
                   <div className="subitem">{this.state.payWay==1?'联系人':'法人'}姓名:<Input onInput={this.addlegalName.bind(this)} className="width140" placeholder="输入联系人" /></div>         
               </div>

               <div className="item">
                   <div className="subitem">{this.state.payWay==1?'联系人':'法人'}电话：<Input onInput={this.addlegalPhone.bind(this)} className="width140" placeholder="输入手机号" /></div>         
               </div>

                

                <div className="item">
                   <div className="subitem">
                      企业营业执照：
                      <div>
                         <Upload {...this.mode} >
                            <Button > <Icon type="upload" />上传营业执照 </Button>
                         </Upload>
                         <img alt='' src={this.state.contractUrl}/>
                      </div>
                     </div>         
               </div>

               <div className="item" style={this.state.payWay==2?{display:'block'}:{display:'none'}}>
                   <div className="subitem">
                      法人身份证：
                      <div>
                         <Upload {...this.mode} >
                            <Button > <Icon type="upload" />上传法人身份证正面 </Button>
                         </Upload>
                         <img alt='' src={this.state.contractUrl}/>
                      </div>
                     </div>         
               </div>
               
               <div className="item" style={this.state.payWay==2?{display:'block'}:{display:'none'}}>
                   <div className="subitem">
                      法人身份证：
                      <div>
                         <Upload {...this.mode} >
                            <Button > <Icon type="upload" />上传法人身份证反面 </Button>
                         </Upload>
                         <img alt='' src={this.state.contractUrl}/>
                      </div>
                     </div>         
               </div>
        </div>   
        <Button onClick={this.submit.bind(this)}>提交申请</Button>
      </div>
    );
  }
}
export default Reg