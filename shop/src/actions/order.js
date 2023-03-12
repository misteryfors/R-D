import axios from 'axios'
import {sendMessage} from "./message";



export const createOrder = (chat,user,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs, role) => {
    return async dispatch => {
        try {
            console.log(time)
            const response = await axios.post(`https://master43.ru:8443/api/order/createOrder`, {
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
            if (role!='admin')
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
            const response = await axios.post(`https://master43.ru:8443/api/order/getOrder`, {
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
            const response = await axios.post(`https://master43.ru:8443/api/prod/deleteProduct`, {
                UID
            })
            console.log(response.data.product._id)
            if (response.data.product)
            console.log(response.data.product)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const redactOrder = async (id,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs) => {
    try {
        const response = await axios.post(`https://master43.ru:8443/api/order/redactOrder`, {
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

            const response = await axios.post(`https://master43.ru:8443/api/prod/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            //dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export async function getOrders(currentPage,setCurrenPage,setFetching,products,setProducts,setCountPage,pageCount,revers) {
    try {
        let url=`https://master43.ru:8443/api/order/getOrders?currentPage=${currentPage+1}&revers=${revers}`

        const response = await axios.get(url).finally(()=>setFetching(false))
        console.log(response.data)
        console.log(response.data)
        setProducts([...products,...response.data.products])
        setCountPage(pageCount=>response.data.pagination.pageCount)
        setCurrenPage(currentPage=>currentPage+1)
        console.log([...products,...response.data.products])
        return url
        //dispatch(setProducts(response.data.products))
        //dispatch(setPageCount(response.data.pagination.pageCount))

    } catch (e) {
        //alert(e)
    }
}