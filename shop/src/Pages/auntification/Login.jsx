import React, {useState} from 'react';
import '../../components/css/inputs.css'
import '../../components/css/authorization.css'
import Input from "../../components/MicroComponents/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import {NavLink} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
            <NavLink to="/registration"><div className="authorization__btn">Регистрация</div></NavLink>
        </div>
    );
};

export {LoginPage};