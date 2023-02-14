import React, {useEffect,useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, getProducts, redactProduct} from "../../../../actions/product";
import Products from "./Products";
import Modal from "./modal";
import {setPage} from "../../../../reducers/shopReducer";
import {setLOAD} from "../../../../reducers/productReducer";



export default function CPProducts(){
    const dispatch = useDispatch()
    const products = useSelector(state =>state.shop.products.reverse())
    const [name, setName] = useState("")
    const [modalActive, setModalActive] = useState("")
    const productsList = products?.map(product => <Products key={product._id} product={product}/>)
    const currentPage= useSelector(state =>state.shop.page)
    const pageCount= useSelector(state =>state.shop.pageCount)

    let pages=[]
    function createPages(pages, pagesCount, currentPage) {
        if(pagesCount > 10) {
            if(currentPage > 5) {
                for (let i = currentPage-4; i <= currentPage+5; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
            else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
        }  else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }
    createPages(pages,pageCount,currentPage)
    useEffect(() => {
        setLOAD(false)
        dispatch(getProducts(currentPage,{all:'',name:'',type:'',mark:'',minPrice:null,maxPrice:null}))
        pages=[]
        createPages(pages,pageCount,currentPage)
    }, [currentPage])
    return(
        <div>
            <button className={"MainButton"} onClick={()=>setModalActive(true)}>Создать</button>
                <div className={"shortList"} style={{display:"block"}}>
                    {productsList}
                </div>
            <Modal active={modalActive} setActive={setModalActive} name={name} setName={setName}/>
            <div className={'pagination'} style={{width: '100%'}}>
                {pages.map((page,index)=><span
                    key={index}
                    className={currentPage==page ? 'current-page':'page'}
                    onClick={()=>dispatch(setPage(page))}>{page}</span>) }
            </div>
        </div>
    )
}
export {CPProducts};