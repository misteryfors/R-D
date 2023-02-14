import React, { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, getProduct, redactProduct} from "../../../../actions/product";
import {uploadFile} from "../../../../actions/product";
import "../../../../components/css/NewProd.css";
import '../../../../components/css/imgList.css'
import plug from "../../../../components/image/Заглушка.png";
import {setAll, setLOAD} from "../../../../reducers/productReducer";
import {setProducts} from "../../../../reducers/shopReducer";

const NewProduct = () => {
    let { id } = useParams();
    setAll(null)
    const [ready, setReady] = useState(false)
    const [mainImg, setMainImg] = useState([])
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [price, setPrice] = useState("")
    const [imgs, setImgs] = useState([])
    const loads=useSelector(state =>state.product.load)
    const [shortDescription, setShortDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const product = useSelector(state =>state.product)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)


    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {dispatch(uploadFile(file, id, 'products'));setImgs([...imgs, file.name]);})
        console.log(imgs)
        //setImgs(files[0].name)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("brand", mark);
        formData.append("price", price);
        formData.append("imgs", imgs);
        formData.append("shortDescription", shortDescription);
        formData.append("fullDescription", fullDescription);

    };
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
        files.forEach(file => {dispatch(uploadFile(file, id, 'products'));console.log(file.name);setImgs([...imgs, file.name]);})
        setDragEnter(false)
    }
    useEffect(() => {
        dispatch(getProduct(id,setImgs))
        setName(product.name)
        setType(product.type)
        setMark(product.mark)
        setImgs(product.imgs)
        setMainImg(product.imgs[0])
        setPrice(product.price)
        setShortDescription(product.shortDescription)
        setFullDescription(product.fullDescription)
        setReady(true)
    }, [])
    return (
        <div>
        {loads==true?
                <div>
        <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className={"leftBlock"}>
                    <div className="imgSlot" style={{display: "block"}}>
                        {!dragEnter ?
                            <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                  onDragOver={dragEnterHandler}>
                                <div className="mainImg">
                                    <img src={"http://178.141.253.120:3001/products/" + id + "/" + mainImg}/>
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
                                         src={"http://178.141.253.120:3001/products/" + id + "/" + el}/>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input type="text"
                               name={'uploader'}
                               className="form-control"
                               required multiple={true} onChange={(event) => {
                            fileUploadHandler(event);
                            console.log();
                        }} type="file" id="disk__upload-input" className="disk__upload-input"/>
                    </div>
                    <div className={"price"}>
                        <label>price</label>
                        <input
                            type="text"
                            className="input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="rightBlock">
                    <div className="Name">
                        <label>Name</label>
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="Type">
                        <label>Type</label>
                        <input
                            type="text"
                            className="input"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="Mark">
                        <label>Mark</label>
                        <input
                            type="text"
                            className="input"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                            required
                        />
                    </div>
                    <div className="shortDescription">
                        <label>shortDescription</label>
                        <textarea
                            type="text"
                            className="input"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="fullDescription">
                        <label>fullDescription</label>
                        <textarea
                            type="text"
                            className="input"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className={"btnSave"}
                            onClick={() => redactProduct(id, name, type, mark, imgs, price, shortDescription, fullDescription, true)}>Сохранить
                    </button>
                </div>
            }



        </form>
                </div> : <div className={"loading"}/>}
            }
        </div>

    )}
export {NewProduct}