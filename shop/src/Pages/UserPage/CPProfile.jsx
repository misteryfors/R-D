import React from 'react'
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/MicroComponents/input/Input";
import {ChangAccountInformation, login} from "../../actions/user";
import {useState} from 'react';
export default function CPProfile(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    console.log(useParams())
    return(
        <div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
                <Input value={password} setValue={setPassword} type="text" placeholder="Введите пароль..."/>
                <Input value={phone} setValue={setPhone} type="text" placeholder="Введите телефон..."/>
                <button onClick={() => dispatch(ChangAccountInformation(email, password, phone))}>Войти</button>
        </div>
    )
}
export {CPProfile};