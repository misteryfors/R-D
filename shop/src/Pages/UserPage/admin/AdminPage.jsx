import '../../../components/css/inputs.css'
import '../../../components/css/authorization.css'
import '../../../components/css/UsersPage.css'
import {NavLink, Outlet, useParams} from "react-router-dom";
import {logout} from "../../../reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";

const AdminPage = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    console.log(useParams())
    return(
        <div style={{width: "100%",display:"flex"}}>
            <div style={{width: "35%"}}>
                <NavLink to="profile"><button className={"MainButton"}>Профиль</button></NavLink>
                <NavLink to="chats"><button className={"MainButton"}>Чаты</button></NavLink>
                <NavLink to="products"><button className={"MainButton"}>Продукты</button></NavLink>
                <NavLink to="orders"><button className={"MainButton"}>Заказы</button></NavLink>
                <NavLink to="/"><div className={"MainButton"} onClick={() => dispatch(logout()) }>Выход</div></NavLink>
            </div>
            <div style={{width: "65%"}}>
                <Outlet/>
            </div>

        </div>



    )
}
export {AdminPage};