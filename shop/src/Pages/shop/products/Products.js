import React from 'react'
import {NavLink} from "react-router-dom";
import plug from '../../../components/image/Заглушка.png'



const Products=({product})=>{
    let img;
    if (product.imgs.length!=0)
    {
        img=<img src={"http://178.141.253.120:3001/products/"+product._id+"/"+product.imgs[0]}/>
    }else {
        img=<img src={plug}/>
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