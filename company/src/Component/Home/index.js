import React,{Component} from 'react'
import NavList from '../NavList'
import bannerUrl from '../../img/banner.png'
import logo from '../../img/logo.png'
import logo1 from '../../img/logo1.png'
import './home.css'
class Home extends Component{
    render(){
        return(<div className='home'>
       <div className='top'>
        <img src={logo} alt='' />
        <div className='phone'>客服 <i>400</i><i>6510</i><i>488</i></div>
       </div>
       <div className='logo1'><img src={logo1} alt=''/></div>
       <NavList/>
       <div className='banner'>
         <img src={bannerUrl} alt=''/>  
       </div>
       <div className='footer'>
       <span>合作快递</span>
         <ul>
             <li>EMS</li>
             <li>中通</li>
         </ul>
       </div>
        </div>)
    }
}                               
export default Home