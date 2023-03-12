import React from 'react'
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/MicroComponents/input/Input";
import {ChangAccountInformation, login} from "../../actions/user";
import {useState} from 'react';
export default function CPProfile(){
    const user=useSelector(state =>state.user.currentUser)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("******")
    const [phone, setPhone] = useState(user.phone)
    const dispatch = useDispatch()
    console.log(useParams())
    return(
        <div>
            <div style={{margin:'20%',display:"block",width:'100px'}}>
            <Input style={{margin:'20%'}} value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input style={{margin:'20%'}} value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <Input style={{margin:'20%'}} value={phone} setValue={setPhone} type="text" placeholder="Введите телефон..."/>
            <button style={{margin:'20%'}}  onClick={() => dispatch(ChangAccountInformation(email, password, phone))}>Изменить</button>
            </div>
        </div>
    )
}
export {CPProfile};