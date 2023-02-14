import React from 'react';
import {useSelector} from "react-redux";
import Products from "./Products";
import '../../../components/css/Product.css'

const ProductsList = () => {

    const prod =(useSelector(state => state.shop.products))

    const products = prod?.map(product => <Products key={product._id} product={product}/>)

    return (

                <div style={{width: '80%', height: '100%'}}>
                        {products}
                </div>

    );
};

export default ProductsList;