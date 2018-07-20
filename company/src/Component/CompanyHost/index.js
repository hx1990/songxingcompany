import React,{Component} from 'react'
import Main from '../Main'
import Head from '../Head'
class CompanyHost extends Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(<div>
          <Head/>
          <Main/>  
        </div>)
    }
}
export default CompanyHost