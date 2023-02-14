import React, {Component, useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {getProduct, getProducts, redactProduct} from "../../../actions/product";
import {useDispatch, useSelector} from "react-redux";
import "../../../components/css/NewProd.css"
import '../../../components/css/imgList.css'
import '../../../components/css/loading.css'
import plug from "../../../components/image/Заглушка.png"
import {setLOAD} from "../../../reducers/productReducer";

const ProductPage=()=>{
    const [mainImg, setMainImg] = useState([])
    const loads=useSelector(state =>state.product.load)
    const dispatch = useDispatch()
    let { id } = useParams();
    const product = useSelector(state =>state.product)
    useEffect(() => {

        dispatch(getProduct(id))
        console.log(product)

    }, [])
    // получаем параметры строки запроса
    return(
        <div>
            {loads===true ?
                <div>
        <form className={"ProductForm"} >

            <div className={"leftBlock"}>
                <div className="imgSlot" style={{display:"block"}}>
                            <div className="mainImg">
                                <img  src={"http://178.141.253.120:3001/products/"+id+"/"+(mainImg!="" ? mainImg:product.imgs[0])}/>
                            </div>
                    <div className={"imgList"}>
                        {product.imgs.map(el =>(
                            <div className={"additionalImg"}>
                                <img onMouseEnter={()=>setMainImg(el)} src={"http://178.141.253.120:3001/products/"+id+"/"+el ? "http://178.141.253.120:3001/products/"+id+"/"+el :plug}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"price"}>
                    <label>price {product.price}</label>
                </div>
            </div>
            <div className="rightBlock">
                <div className="Name">
                    <label>Название</label>
                    <p>{product.name}</p>
                </div>
                <div className="Type">
                    <label>Тип</label>
                    <p>{product.type}</p>
                </div>
                <div className="Mark">
                    <label>Марка</label>
                    <p>{product.mark}</p>
                </div>
                <div className="shortDescription">
                    <label>Описание</label>
                    <p>{product.shortDescription}</p>
                </div>
                <div className="fullDescription">
                    <label>Дополнительно</label>
                    <p>{product.fullDescription}</p>
                </div>
           </div>



        </form>
                </div> : <div className={"loading"}/>}
        </div>
    )
}
export default ProductPage