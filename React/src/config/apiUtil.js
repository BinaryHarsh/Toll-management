// import Cookies from 'js-cookie';
import axiosUtil, { sessionapi } from './axiosUtil'
import qs from 'qs';
const serializerconfig={
    arrayFormat:'brackets',
    encode:false
}
export function callapi(path , params ,method , data = null ,options={},headersobj = {}){
    
    const url = `${process.env.REACT_APP_API_URL}${path}`
    const headers = {
        'Content-Type':'application/json',
        'Authorization':`bearer ${JSON.parse(localStorage.getItem('id_token'))}`,
        ...headersobj
    }
    return axiosUtil({
        method,
        url,
        params,
        paramsSerializer:(paramObj) => qs.stringify(paramObj , serializerconfig ),
        data,
        headers,
        ...options,
    })
}