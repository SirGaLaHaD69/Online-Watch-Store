import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './core.css'
import { isAuthenticated, signout } from '../auth/helper/index';
const Menu = ({history,path})=> {

    const currentTab = (history,path) =>{
        if(history.location.pathname === path)
            return {color: 'white',background:"#011c01"}
        return {color: 'white'}
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light ">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


        <ul className="navbar-nav mr-auto">

        <li className="nav-item active m-2 ">
            <Link className="nav-link  px-4 rounded-lg mynav" to = '/' style = {currentTab(history,'/')} >Home </Link>
        </li>
        {isAuthenticated() && 
            <Fragment>
                <li className="nav-item active m-2 ">
                    <Link className="nav-link  px-4 rounded-lg mynav" to = '/my-orders' style = {currentTab(history,'/my-orders')} >My Orders</Link>
                </li>
                <li className="nav-item active m-2 ">
                    <Link className="nav-link  px-4 rounded-lg mynav" to = '/cart' style = {currentTab(history,'/cart')} >Cart </Link>
                </li>
            </Fragment>
        } 
        </ul>



        <ul className="navbar-nav ml-auto">
        {!isAuthenticated() && 
            <Fragment>
                <li className="nav-item active m-2 ">
                    <Link className="nav-link  px-4 rounded-lg mynav" to = '/signin' style = {currentTab(history,'/signin')} >Login </Link>
                </li>
                <li className="nav-item active m-2 ">
                    <Link className="nav-link  px-4 rounded-lg mynav" to = '/signup' style = {currentTab(history,'/signup')} >Signup </Link>
                </li>
            </Fragment>
        }
        {isAuthenticated() &&
            <li className="nav-item active m-2 ">
            <a className="nav-link  px-4 rounded-lg mynav" style = {currentTab(history,'/signout'),{background:"#c45f1b"}}
                href = '#' onClick = {()=>{signout(()=>history.push('/'))}}
            >Signout </a>
            </li>
        
        }
        
        </ul>
    </div>
    </nav>
    )
}

export default withRouter(Menu);

