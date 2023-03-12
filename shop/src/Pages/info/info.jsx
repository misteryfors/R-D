import {Link, NavLink, Outlet} from "react-router-dom";
import React, {useEffect,useState} from 'react';
import '../../main.css';
import {Helmet} from "react-helmet";
import Modal from "./modal";


const InfoPage = () => {
    const [modalActive, setModalActive] = useState("")
    return(

        <div style={{width: '90%',margin: '5%', display: 'flex',}}>
            <Helmet>
                <title>Info</title>
                <link rel="canonical" href="https://master43.ru" />
                <meta name="description" content="На нашем сайте мы предоставляем услуги
                    по сервисному обслуживанию гарантийному и после гарантийный
                    Стиральных машин
                    Холодильников
                    Кофемашин
                    Посудомоечные машины
                    Варочные панели
                    И продаже
                    Холодильников
                    Стиральных машин
                    Варачных панелей
                    Духовые шкафы" />
            </Helmet>
            <div style={{width: '50%', display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <div style={{width: '80%',fontSize: '25px'}}>
                    На нашем сайте мы предоставляем услуги
                    по сервисному обслуживанию гарантийному и после гарантийный:
                    <li>Стиральных машин</li>
                    <li>Холодильников</li>
                    <li>Кофемашин</li>
                    <li>Посудомоечные машины</li>
                    <li>Варочные панели</li>
                    И продаже
                    <li>Холодильников</li>
                    <li>Стиральных машин</li>
                    <li>Варачных панелей</li>
                    <li>Духовые шкафы</li>

                </div>
            </div>
            <div>
                <button className={"MainButton"} onClick={()=>setModalActive(true)}>Карта</button>
                <Modal active={modalActive} setActive={setModalActive}/>
            </div>
            <div style={{width: "50%",display:'flex'}}>
                <NavLink style={{width: '20%',height: '200px',margin:"20px"}} to={'/NewOrder'}>
                    <div  style={{display:'block'}}>
                        <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/Order.jpg")}/>
                        <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/strelka.png")}/>
                    </div>
                </NavLink>
            </div>
        </div>


)
}
export {InfoPage};