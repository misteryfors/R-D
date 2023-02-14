import '../../main.css';
import Products from "./products/Products";
import {createChat, getChats, sendMessage} from "../../actions/message";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProducts, redactProduct} from "../../actions/product";
import ProductsList from "./products/ProductsList";
import '../../components/css/search.css'
import '../../components/css/Filter.css'
import '../../components/css/Pagination.css'
import {setPage} from "../../reducers/shopReducer";
import Filters from "./filters/filters";
import MultiRangeSlider from "./filters/multiRangeSlider/MultiRangeSlider";
import {NavLink, useParams} from "react-router-dom";
import filters from "./filters/filters";



const prod = {
    products:[
        {id:'1',type:'1samsung',img:'tovar.jpg',title:'Samsung',price:90000,shortDescription:'ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ZZZ XXX CCC VVV BBB ',link:''},
        {id:'2',type:'1lg',img:'tovar.jpg',title:'lg',price:80000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
        {id:'3',type:'1Sang',img:'tovar.jpg',title:'Sang',price:70000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
        {id:'4',type:'12Seler',img:'tovar.jpg',title:'Seler',price:60000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
        {id:'5',type:'2Sakura',img:'tovar.jpg',title:'Sakura',price:50000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
        {id:'6',type:'2devor',img:'tovar.jpg',title:'devor',price:40000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
        {id:'7',type:'2Samsung',img:'tovar.jpg',title:'Samsung',price:30000,shortDescription:'ZZZ XXX CCC VVV BBB',link:''},
    ]
}
const MainPage = () => {
    const dispatch = useDispatch()
    const [products,setposts] = useState([]);
    const currentPage= useSelector(state =>state.shop.page)
    const pageCount= useSelector(state =>state.shop.pageCount)
    const [all, setAll] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(999999999999)
    const user=useSelector(state =>state.user.currentUser.id)
    const role=useSelector(state =>state.user.currentUser.role)
    let pages=[]
    console.log(user)
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
    useEffect(()=>{
        fetch('')
    })
    useEffect(() => {
        dispatch(getProducts(currentPage,{all,name,type,mark,minPrice,maxPrice}))
        dispatch(getChats(user))
    }, [currentPage])
    function filtr(){
        dispatch(getProducts(currentPage,{all,name,type,mark,minPrice,maxPrice}))
        pages=[]
        createPages(pages,pageCount,currentPage)
        console.log(pages,pageCount,currentPage)
    }

    return(
        <div className={"content"}>

                    <div className="searchBlock" style={{width: '100%',height: '150px',display:"flex"}}>
                        <div className="searchBox">
                            <input className="search" style={{outline:'none'}} value={all} onChange={(e) => setAll(e.target.value)}/>
                        </div>

                            <NavLink style={{width: '100px',height: '100px',margin:"20px"}} to={'/NewOrder'}>
                            <div  >
                                <img style={{width: '100px',height: '100px',objectFit:"cover"}} src={require("../../components/image/Order.jpg")}/>
                            </div>
                        </NavLink>


                    </div>
                    <div style={{width: '100%',height: '100%',display: 'flex'}}>
                        <Filters
                            filtr={filtr}
                            dispatch={dispatch} currentPage={currentPage}
                            all={all} setAll={setAll}
                            name={name} setName={setName}
                            type={type} setType={setType}
                            mark={mark} setMark={setMark}
                            minPrice={minPrice} setMinPrice={setMinPrice}
                            maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>


                        <div style={{width: '80%',height: '100%'}}>
                            <div className="ProductsSlot">
                                    <ProductsList/>
                            </div>
                        </div>

                    </div>
            <div className={'pagination'} style={{width: '100%'}}>
                {pages.map((page,index)=><span
                    key={index}
                    className={currentPage==page ? 'current-page':'page'}
                    onClick={()=>dispatch(setPage(page))}>{page}</span>) }
            </div>
        </div>
    )
}
export {MainPage};