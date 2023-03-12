import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../components/css/shortProduct.css'
import plug from "../../../../components/image/Заглушка.png";
import {deleteProduct} from "../../../../actions/product";


const Products=({product})=>{
    let img;
    if (product)
    {img=<img src={plug}/>
    if (product.imgs.length!=0)
    {
        img=<img src={"https://master43.ru:8443/orders/"+product._id+"/"+product.imgs[0]}/>
    }else {

    }
    }
    const dispatch = useDispatch()
        return(
            <div className="ShortProductsSlot" style={{display:"flex"}}>


                    <div className="product-wrapper">
                        <div className={"product"}>
                            <div style={{height: '100%',width: '100%',display:"flex"}}>



                                    <div style={{height: '100%',width: '100%',display:"flex"}}>
                                        <div className="imageBox">
                                            {img}
                                        </div>
                                        <div className={'name'}>Адресс: {product.adress ? product.adress : 'БезАдресса'}</div>
                                        <div className={'price'}>ФИО: {product.fio ? product.fio: 'БезФИО'}₽</div>
                                        <div className={'short'}>Телефон: {product.phone ? product.phone: 'без телефона'}</div>
                                        <NavLink to={'/Order/'+product._id}>
                                            <button className={'btn-redact'} >Изменить</button>
                                        </NavLink>
                                        </div>
                            </div>
                        </div>
                    </div>


            </div>
        )
}
export default Products