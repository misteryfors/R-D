import axios from 'axios'
import {setAll, setLOAD, setProd, setUID} from "../reducers/productReducer";
import {addProducts, delProducts, setPage, setPageCount, setProducts} from "../reducers/shopReducer";
import {sendMessage} from "./message";



export const createOrder = (chat,user,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs) => {
    return async dispatch => {
        try {
            console.log(time)
            const response = await axios.post(`http://178.141.253.120:3001/api/order/createOrder`, {
                adress,
                fio,
                phone,
                type,
                mark,
                timeInUse,
                comment,
                urgency,
                time,
                imgs
            })
            alert('Заказа на ремонт успешно отправлен')
            //console.log(response.data)
            dispatch(sendMessage(chat,"",response.data.order._id,user))
            console.log(response.data.order._id)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const getOrder = (orderId,setMainImg, setAdress, setFio, setPhone, setType, setMark, setTimeInUse, setComment, setTime, setImgs, setUrgency) => {
    return async dispatch => {
        try {
            dispatch(setLOAD(false))
            const response = await axios.post(`http://178.141.253.120:3001/api/order/getOrder`, {
                orderId
            })
            console.log(response.data)
                    setMainImg(response.data.order.imgs[0])
                    setAdress(response.data.order.adress)
                    setFio(response.data.order.fio)
                    setPhone(response.data.order.phone)
                    setType(response.data.order.type)
                    setMark(response.data.order.mark)
                    setTimeInUse(response.data.order.timeInUse)
                    setComment(response.data.order.comment)
                    setTime(response.data.order.time.replace("Z", ""))
                    setImgs(response.data.order.imgs)
                    setUrgency(response.data.order.urgency)

            console.log(true)
            setTimeout(dispatch(setLOAD(true)))
        } catch (e) {
            alert(e)
        }
    }
}
export const deleteOrder = (UID) => {
    return async dispatch => {
        try {
            console.log('-------------------------------------')
            console.log(UID)
            const response = await axios.post(`http://178.141.253.120:3001/api/prod/deleteProduct`, {
                UID
            })
            console.log(response.data.product._id)
            if (response.data.product)
                dispatch(delProducts(response.data.product._id))
            console.log(response.data.product)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const redactOrder = async (id,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs) => {
    try {
        const response = await axios.post(`http://178.141.253.120:3001/api/order/redactOrder`, {
            id,
            adress,
            fio,
            phone,
            type,
            mark,
            timeInUse,
            comment,
            urgency,
            time,
            imgs
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export function uploadFile(file, UID) {
    return async dispatch => {
        try {
            console.log(UID);
            const formData = new FormData()
            formData.append('file', file)
            formData.append('UID', UID)

            const response = await axios.post(`http://178.141.253.120:3001/api/prod/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            //dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function getOrders(currentPage,filters) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://178.141.253.120:3001/api/prod/getProducts`,
                {currentPage,filters}
            )
            console.log(response.data)
            dispatch(setProducts(response.data.products))
            dispatch(setPageCount(response.data.pagination.pageCount))
            console.log(true)
            setLOAD(true)
        } catch (e) {
            alert(e)
        }
    }
}