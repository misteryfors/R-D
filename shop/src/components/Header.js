import React from 'react'
import './css/Header.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
export default function Header(){
    const user=useSelector(state =>state.user.currentUser)
    return(
        <header>
            <NavLink to="/">
                <div id='logo'>
                    <img src={require("./image/DaR.png")}/>
                </div>
            </NavLink>
            <NavLink to="/info">
                <div id='info'>
                    О нас
                </div>
            </NavLink>
            <NavLink to="/shop">
                <div id='shop'>
                    Ремонт и Покупка
                </div>
            </NavLink>
            <NavLink to="/User">
                <div id='account'>
                    <img src={require('./image/Profile.PNG')}/>
                    {user.email?(user.name?user.name:user.email):"Мой аккаунт"}
                </div>
            </NavLink>
        </header>
    )
}