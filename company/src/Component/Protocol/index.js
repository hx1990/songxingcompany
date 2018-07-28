import React from 'react'
import {Button,Upload,Icon} from 'antd'
import './index.css'
import axios from 'axios'
import Qs from 'qs'

const log=console.log.bind(console)
const host =window.config.host


class Protocol extends React.Component {
    constructor(...agrs){
        super(...agrs)
        this.state={}
        let that=this
        this.mode={
            action: 'https://mp.zjzct.cn:443/upload/picture',
            onChange({ file}) {
              if(file.status==="done"){
                that.setState({
                  show:false,
                  protocolUrl:file.response.data
                })
                axios.post(host+'/admin/corp/post/contract',Qs.stringify({
                    contract:'https://www.songxinde.cn/pic'
                })).then((res)=>{
                     if(res.data.code===200){
                        log(res.data.data)
                        let loginInfo=sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))
                        loginInfo.status=3
                        log(loginInfo)
                        window.sessionStorage.setItem('loginInfo', JSON.stringify(
                            loginInfo
                          ))
                          window.location.reload()
                    }else{
                      alert(res.data.message)
                    }
                })
          
                
               }
            },
          }
    }
    uploadProtocol(){}
    render(){
        return(
            <div>
               <a href= {window.config.downLoadUrl}> <Button>
                    下载协议
                </Button></a>
                <div onClick={this.uploadProtocol.bind(this)}>
                <Upload {...this.mode} >
            <Button > <Icon type="upload" />上传协议</Button>
            </Upload>
            <img alt='' src={this.state.protocolUrl}/>
                </div>
            </div>
        )
    }
}
export default Protocol