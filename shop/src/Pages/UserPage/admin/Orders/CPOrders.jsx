import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../../actions/product";
import Products from "./Products";
import Modal from "./modal";
import {getOrders} from "../../../../actions/order";




export default function CPOrders(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [modalActive, setModalActive] = useState("")
    const [products,setProducts] = useState([]);
    const [currentPage,setCurrenPage] = useState(0);
    const [countPage,setCountPage] = useState(1);
    const [fetching, setFetching] = useState(false)
    const productsList = products.reverse()?.map(product => <Products key={product._id} product={product}/>)

    useEffect(()=> {
        console.log(fetching)
        console.log(currentPage)
        console.log(countPage)
        if (currentPage + 1 <= countPage)
        {
            if (fetching) {

                getOrders(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,true)

            }
        }

    },[fetching])
    useEffect(()=>{
        setFetching(true)
    },[])
    useEffect(()=>{
        document.addEventListener('scroll',scrollHandler)
        return function (){
            document.removeEventListener('scroll',scrollHandler)
        }
    },[])
    const scrollHandler = (e) =>  {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop +window.innerHeight)<100 && currentPage+1<=countPage ){

            setFetching(true)
        }

    }
    return(
        <div>
            <button className={"MainButton"} onClick={()=>setModalActive(true)}>Создать</button>
                <div className={"shortList"} style={{display:"block"}}>
                    {productsList}
                    {fetching===true && currentPage + 1 <= countPage ?<div style={{width:'100%',height:'200px'}} className="product-wrapper"><div className={"loading1"}/></div>:<div/> }
                </div>
            <Modal active={modalActive} setActive={setModalActive} name={name} setName={setName}/>
        </div>
    )
}
export {CPOrders};