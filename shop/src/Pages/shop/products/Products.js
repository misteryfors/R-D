import React from 'react'
import {NavLink} from "react-router-dom";




const Products=({product})=>{
    let img;
    if (product.imgs.length!=0)
    {
        img=<img src={"https://master43.ru:8443/products/"+product._id+"/"+product.imgs[0]}/>
    }
        return(
            <div className="ProductsSlot">


                    <div className="product-wrapper">
                        <div className={"product"}>
                            <NavLink to={"item/"+product._id} style={{textDecoration:'none'}}>
                                <div style={{height: '90%'}}>
                                    <div style={{height: '90%'}}>
                                        <div className="imageBox">
                                            {img}
                                        </div>
                                        <div className={'name'}>{product.name}</div>
                                        <div className={'price'}>{product.price}</div>
                                        <div className={'short'}>{product.shortDescription}</div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>


            </div>
        )
}
export default Products