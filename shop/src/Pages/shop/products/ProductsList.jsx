import React from 'react';
import {useSelector} from "react-redux";
import Products from "./Products";
import '../../../components/css/Product.css'

const ProductsList = (prod) => {

    //const prod =(useSelector(state => state.shop.products))
    console.log(prod)

    const products = prod.prod?.map(product => <Products key={product._id} product={product}/>)

    return (

                <div style={{width: '80%', height: '100%'}}>
                        {products}
                    {prod.fetching===true && prod.currentPage + 1 <= prod.countPage ?<div style={{width:'100%',height:'200px'}} className="product-wrapper"><div className={"loading1"}/></div>:<div/> }

                </div>

    );
};

export default ProductsList;