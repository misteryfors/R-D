import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../components/css/shortProduct.css'
import plug from "../../../../components/image/Заглушка.png";
import {deleteProduct} from "../../../../actions/product";


const Products=({product,setProducts,products})=>{
    let img;
    if (product)
    {img=<img src={plug}/>
    if (product.imgs.length!=0)
    {
        img=<img src={"https://master43.ru:8443/products/"+product._id+"/"+product.imgs[0]}/>
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
                                        <div className={'name'}>Имя: {product.name ? product.name : 'БезИмени'}</div>
                                        <div className={'price'}>Цена: {product.price ? product.price: 0}₽</div>
                                        <div className={'short'}>Описание: {product.shortDescription}</div>
                                        <button className={'btn-delete'} onClick={() => deleteProduct(product._id,setProducts,products)}>Удалить</button>
                                        <NavLink to={"../../redact/item/"+product._id} >
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