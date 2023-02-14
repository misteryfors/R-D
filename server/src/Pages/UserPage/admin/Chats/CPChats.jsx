import React,{useState,useEffect} from 'react'
import '../../../../components/css/UsersPage.css'
import '../../../../components/css/Chat.css'
import {NavLink} from "react-router-dom";
import {getChats, getMessages, sendMessage} from "../../../../actions/message";
import {useDispatch, useSelector} from "react-redux";
import Message from "./message";
import Products from "../Products/Products";
import {setLOAD} from "../../../../reducers/productReducer";
import {getProducts} from "../../../../actions/product";
import plug from "../../../../components/image/Заглушка.png";

export default function CPChats(){
    const [currentMessage, setCurrentMessage] = useState("")
    const [currentChat, setCurrentChat] = useState(0)
    const dispatch = useDispatch()
    const messages = useSelector(state =>state.chats.messages)
    const user=useSelector(state =>state.user.currentUser.id)
    const chat=useSelector(state =>state.chats.chats)
    console.log(messages)
    useEffect(() => {
        console.log(chat)
        console.log(user)
        if (chat==null)
        dispatch(getChats(user))
        if (chat)
        if (chat.length>0)
        {
            if (chat.length==1)
                dispatch(getMessages(chat[0]._id))
        }

    }, [user,chat])

    const messageList = messages?.map(msg => <Message key={msg._id} message={msg} user={msg.user==chat[currentChat].firstUser ? chat[currentChat].firstUserName : chat[currentChat].secondUserName} pos={msg.user==user ? 'message right':'message left'}/>)
    return(
        <div style={{display:"flex"}}>
            {chat ?
                chat.length>1 ?
                    <div>
                        <div className={"chatsList"}>
                            {chat.map((el,index)=>(
                                    <div className={"additionalChats"} onClick={()=>{setCurrentChat(index);console.log(el);console.log(el._id);dispatch(getMessages(el._id))}}>
                                        {el.firstUserName}
                                    </div>
                                )
                            )
                            }
                        </div>
                    </div>:
                    <div></div>
                :
                <div></div>

            }
        <div className={"Chat"}>
            <div className={"messageList"}>
                {messageList}
            </div>

            <div className="inputBox">
                <input
                type="text"
                className="input"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                required
            />
                <div
                    className={"btnSend"}
                    onClick={() => dispatch(sendMessage(chat[0]._id,currentMessage,null,user))}
                >
                </div>
                </div>

        </div>
        </div>
    )
}
export {CPChats};