import '../../main.css';
import {createChat, getChats, sendMessage} from "../../actions/message";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../actions/product";
import ProductsList from "./products/ProductsList";
import '../../components/css/search.css'
import '../../components/css/Filter.css'
import '../../components/css/Pagination.css'
import Filters from "./filters/filters";
import {NavLink, useParams, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";




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
    const search = useLocation().search;
    let params = (new URL(document.location)).searchParams;
    let currentPage1 = params.get('currentPage');
    let all1 = params.get('all');
    let name1 = params.get('name');
    let type1 = params.get('type');
    let mark1 = params.get('mark');
    let minPrice1 = params.get('minPrice');
    let maxPrice1 = params.get('maxPrice');
    const [products,setProducts] = useState([]);
    const [currentPage,setCurrenPage] = useState(currentPage1 ? currentPage1 : 0);
    const [countPage,setCountPage] = useState(1);
    const [all, setAll] = useState(all1?all1:"")
    const [name, setName] = useState(name1?name1:"")
    const [type, setType] = useState(type1?type1:"")
    const [mark, setMark] = useState(mark1?mark1:"")
    const [minPrice, setMinPrice] = useState(minPrice1 ? minPrice1 : 0)
    const [maxPrice, setMaxPrice] = useState(maxPrice1 ? maxPrice1 : 100000)
    const user=useSelector(state =>state.user.currentUser.id)
    const role=useSelector(state =>state.user.currentUser.role)
    const [fetching, setFetching] = useState(false)
    const navigate = useLocation();


    useEffect(()=>{
        setFetching(true)
    },[])
    useEffect(()=> {

        if (currentPage + 1 <= countPage)
        {
            if (fetching) {
                getProducts(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,false, {
                    all,
                    name,
                    type,
                    mark,
                    minPrice,
                    maxPrice
                })

            }
        }

    },[fetching])
    useEffect(()=>{
        dispatch(getChats(user))
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


    function filtr(){
        getProducts(0,setCurrenPage,setFetching,[],setProducts,setCountPage,0,false,{all,name,type,mark,minPrice,maxPrice})

    }

    return(
        <div className={"content"}>
            <Helmet>
                <title>Shop</title>
                <link rel="canonical" href="https://master43.ru" />
                <meta name="description" content="На нашем сайте мы предоставляем услуги
                    по сервисному обслуживанию гарантийному и после гарантийный" />
            </Helmet>
                    <div className="searchBlock" style={{width: '100%',height: '150px',display:"flex"}}>
                        <div className="searchBox">
                            <input className="search" style={{outline:'none'}} value={all} onChange={(e) => setAll(e.target.value)}/>
                        </div>

                            <NavLink style={{width: '15%',height: '200px',margin:"20px"}} to={'/NewOrder'}>
                            <div  style={{display:'block'}}>
                                <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/Order.jpg")}/>
                                <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/strelka.png")}/>
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


                        <div style={{width: '80%',height: '100%',display:'block'}}>
                            <div className="ProductsSlot">
                                    <ProductsList prod={products} fetching={fetching} currentPage={currentPage} countPage={countPage}/>

                            </div>


                        </div>

                    </div>
        </div>
    )
}
export {MainPage};