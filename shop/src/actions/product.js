import axios from 'axios'



export async function createProduct (name, type, mark, imgs, price, shortDescription, description, publicate,setProducts,products) {
        try {
            const response = await axios.post(`https://master43.ru:8443/api/prod/createProduct`, {
                name,
                type,
                mark,
                imgs,
                price,
                shortDescription,
                description,
                publicate
            })
            if (response.data.product)
            {
                console.log(response.data)
                setProducts([response.data.product,...products])
            }
            console.log(response.data)
        } catch (e) {
            alert(e)
            //alert(e.response.data.message)
        }
}
export async function getProduct (UID,setProduct,setFetching) {
        try {
            let user=localStorage.getItem('token')
            const response = await axios.get(`https://master43.ru:8443/api/prod/getProduct?id=${UID}&user=${user}`)
            if (response.status === 200) {
                setProduct(response.data.product)
                setFetching(false)
            }
            console.log(response.data.product)
            console.log(true)
        } catch (e) {
            alert(e.response.data.message)
        }
}
export async function deleteProduct (UID,setProducts,products) {
        try {
            console.log('-------------------------------------')
            console.log(UID)
            const response = await axios.post(`https://master43.ru:8443/api/prod/deleteProduct`, {
                UID
            })
            console.log(response.data.product._id)
            if (response.data.product)
                setProducts(products.filter(product => product._id != response.data.product._id))
            console.log(response.data.product)
        } catch (e) {
            alert(e.response.data.message)
        }
}
export async function redactProduct (UID, name, type, mark, imgs, price, shortDescription, description, publicate,privateComment) {
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
        const response = await axios.post(`https://master43.ru:8443/api/prod/redactProduct`, {
            UID,
            name,
            type,
            mark,
            imgs,
            price,
            shortDescription,
            description,
            publicate,
            privateComment
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export async function uploadFile (file, UID,DIR) {
        try {
            console.log(UID);
            console.log(DIR);
            const formData = new FormData()
            formData.append('file', file)
            formData.append('UID', UID)
            formData.append('DIR', DIR)
            const response = await axios.post(`https://master43.ru:8443/api/prod/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            //dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
}
export async function getProducts(currentPage,setCurrenPage,setFetching,products,setProducts,setCountPage,pageCount,revers, filters) {
        try {
            let user=localStorage.getItem('token')
            let url=`https://master43.ru:8443/api/prod/getProducts?currentPage=${currentPage+1}&all=${filters.all}&name=${filters.name}&type=${filters.type}&mark=${filters.mark}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&revers=${revers}&user=${user}`

            const response = await axios.get(url).finally(()=>setFetching(false))
            console.log(response.data)
            console.log(response.data.products)
            if (revers===true)
                response.data.products.reverse()
            console.log(products)
            setProducts([...products,...response.data.products])
            setCountPage(pageCount=>response.data.pagination.pageCount)
            setCurrenPage(currentPage=>Number(currentPage+1))
            console.log([...products,...response.data.products])
            return url
            //dispatch(setProducts(response.data.products))
            //dispatch(setPageCount(response.data.pagination.pageCount))

        } catch (e) {
            //alert(e)
        }
}