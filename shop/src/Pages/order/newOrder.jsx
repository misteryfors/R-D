import React, { useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, getProduct, redactProduct} from "../../actions/product";
import {uploadFile} from "../../actions/product";
import "../../components/css/NewProd.css";
import '../../components/css/imgList.css'
import {createOrder, getOrder, redactOrder} from "../../actions/order";
import {getChats} from "../../actions/message";

const NewOrder = () => {
    let { id } = useParams();




    const [mainImg, setMainImg] = useState([])
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState([])
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [timeInUse, setTimeInUse] = useState("")
    const [comment, setComment] = useState("")
    const [time, setTime] = useState("")
    const [imgs, setImgs] = useState([])
    const [urgency,setUrgency] = useState(false)
    const loads=true
    const order = useSelector(state =>state.order)
    const user=useSelector(state =>state.user.currentUser.id)
    const role=useSelector(state =>state.user.currentUser.role)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const chat=useSelector(state =>state.chats.chats)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


    };
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {dispatch(uploadFile(file, user,'orders'));setImgs([...imgs, file.name]);})
        console.log(imgs)
        //setImgs(files[0].name)
    }
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => {dispatch(uploadFile(file, user,'orders'));console.log(file.name);setImgs([...imgs, file.name]);})
        setDragEnter(false)
    }
    useEffect(() => {
        dispatch(getChats(user))
    }, [])
    return (
        <div>
            {loads==true ?
                <div>
                    <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                        <div className={"leftBlock"}>
                            <div className="imgSlot" style={{display: "block"}}>
                                {!dragEnter ?
                                    <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                          onDragOver={dragEnterHandler}>
                                        <div className="mainImg">
                                            <img src={"http://178.141.253.120:3001/orders/" + user + "/" + mainImg}/>
                                        </div>
                                    </form> :
                                    <div className="mainImg">
                                        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                                             onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                                            Перетащите файлы сюда
                                        </div>
                                    </div>}
                                <div className={"imgList"}>
                                    {imgs.map(el => (
                                        <div className={"additionalImg"}>
                                            <img onMouseEnter={() => setMainImg(el)}
                                                 src={"http://178.141.253.120:3001/orders/" + user + "/" + el}/>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="rightBlock">
                            <div className="name">
                                <label>как к вам обращаться (ФИО)</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={fio}
                                    onChange={(e) => setFio(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="name">
                                <label>адресс</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="name">
                                <label>телефон</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="Type">
                                <label>тип</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="Mark">
                                <label>марка</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={mark}
                                    onChange={(e) => setMark(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="Mark">
                                <label>удобное время для прибытия</label>
                                <input
                                    type="datetime-local"
                                    className="input"
                                    value={'2017-06-01T08:30'}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="Mark">
                                <label>Время эксплуатации оборудывания</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={timeInUse}
                                    onChange={(e) => setTimeInUse(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="fullDescription">
                                <label>комментарий</label>
                                <textarea
                                    type="text"
                                    className="input"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="fullDescription">
                                <NavLink to={'/User/chats'}>
                                <button className={"btnSave"}
                                        onClick={() => role=='client' ? dispatch(createOrder(chat[0]._id, user, adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs))  : alert('Вам эта функция недоступна вы администратор')}>Сохранить
                                </button>
                                </NavLink>
                            </div>

                        </div>
                        }



                    </form>
                </div> : <div className={"loading"}/>
            }
        </div>

    )}
export {NewOrder}