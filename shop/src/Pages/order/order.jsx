import React, { useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, getProduct, redactProduct} from "../../actions/product";
import {uploadFile} from "../../actions/product";
import "../../components/css/NewProd.css";
import '../../components/css/imgList.css'
import {setLOAD} from "../../../src/reducers/productReducer";
import {createOrder, getOrder, redactOrder} from "../../actions/order";
import {getChats} from "../../actions/message";

const Order = () => {
    let { id } = useParams();



    const [mainImg, setMainImg] = useState([])
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState([])
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [timeInUse, setTimeInUse] = useState("")
    const [comment, setComment] = useState("")
    const [time, setTime] = useState(Date.now+1)
    const [imgs, setImgs] = useState([])
    const [urgency,setUrgency] = useState(false)
    const loads=true
    const order = useSelector(state =>state.order)
    const user=useSelector(state =>state.user.currentUser.id)
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
        dispatch(getOrder(id,setMainImg, setAdress, setFio,setPhone, setType, setMark, setTimeInUse, setComment, setTime, setImgs, setUrgency))
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
                            <div className="disk__upload">
                                <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                                <input type="text"
                                       name={'uploader'}
                                       className="form-control"
                                       multiple={true} onChange={(event) => {
                                    fileUploadHandler(event);
                                    console.log();
                                }} type="file" id="disk__upload-input" className="disk__upload-input"/>
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
                                <label>Тип</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="Mark">
                                <label>Марка</label>
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
                                    id={'dateTimeInput'}
                                    type="datetime-local"
                                    className="input"
                                    value={time.toString()}
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
                            <div className="Mark">
                                <label>Комментарий</label>
                                <textarea
                                    type="text"
                                    className="input"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                            </div>

                            <button className={"btnSave"}
                                    onClick={() => redactOrder(id,adress, fio, phone, type, mark, timeInUse, comment, urgency, new Date(time).toISOString(), imgs)}>Сохранить
                            </button>

                        </div>
                        }



                    </form>
                </div> : <div className={"loading"}/>
            }
        </div>

    )}
export {Order}