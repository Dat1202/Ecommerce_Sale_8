import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

const Host = 'http://192.168.1.5:8000'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'category-store': (storeId) => `/store/${storeId}/categories/`,
    'products-store': (storeId) => `/store/${storeId}/products/`,
    'store': (storeId) => `/store/${storeId}`,
    'reviews': (storeId) => `/store/${storeId}/reviews/`,
    'add-reviews': (storeId) => `/store/${storeId}/add_review/`,
    'comments': (productId) => `/products/${productId}/comments/`,
    'add-comments': (productId) => `/products/${productId}/add_comments/`,
    'product-details': (productId) => `/products/${productId}`,
    'register-store': '/store/register-store/',
    'pay': '/payment/'
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: Host,
        headers: {
            'Authorization': `Bearer ${accessToken?accessToken:AsyncStorage.getItem('access-token')}`  
        }
    })
}

export default axios.create({
    baseURL: Host
})