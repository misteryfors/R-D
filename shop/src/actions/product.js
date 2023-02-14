import axios from 'axios'
import {setAll, setLOAD, setProd, setUID} from "../reducers/productReducer";
import {addProducts, delProducts, setPage, setPageCount, setProducts} from "../reducers/shopReducer";



export const createProduct = (name, type, mark, imgs, price, shortDescription, description, publicate) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://178.141.253.120:3001/api/prod/createProduct`, {
                name,
                type,
                mark,
                imgs,
                price,
                shortDescription,
                description,
                publicate
            })
            dispatch(addProducts(response.data.product))
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const getProduct = (UID,setImgs) => {
    return async dispatch => {
        try {
            dispatch(setLOAD(false))
            const response = await axios.post(`http://178.141.253.120:3001/api/prod/getProduct`, {
                UID
            })
            if (response.data.product)
            dispatch(setAll(response.data.product))
            if (setImgs)
            {
                setImgs(response.data.product.imgs)
            }
            console.log(response.data.product)
            console.log(true)
            setTimeout(dispatch(setLOAD(true)))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const deleteProduct = (UID) => {
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
export const redactProduct = async (UID, name, type, mark, imgs, price, shortDescription, description, publicate) => {
    try {
        console.log(UID)
        console.log(name)
        console.log(type)
        console.log(mark)
        console.log(imgs)
        console.log(price)
        console.log(shortDescription)
        console.log(description)
        console.log(publicate)
        const response = await axios.post(`http://178.141.253.120:3001/api/prod/redactProduct`, {
            UID,
            name,
            type,
            mark,
            imgs,
            price,
            shortDescription,
            description,
            publicate
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export function uploadFile(file, UID,DIR) {
    return async dispatch => {
        try {
            console.log(UID);
            console.log(DIR);
            const formData = new FormData()
            formData.append('file', file)
            formData.append('UID', UID)
            formData.append('DIR', DIR)
            const response = await axios.post(`http://178.141.253.120:3001/api/prod/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            //dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function getProducts(currentPage,filters) {
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