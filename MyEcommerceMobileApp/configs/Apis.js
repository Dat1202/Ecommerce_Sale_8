import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

const Host = 'http://192.168.1.5:8000'

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'stats-revenue-store': '/users/stats_revenue_store',
    'category-store': (storeId) => `/store/${storeId}/categories/`,
    'products-store': (storeId) => `/store/${storeId}/products/`,
    'store': (storeId) => `/store/${storeId}`,
    'reviews': (storeId) => `/store/${storeId}/reviews/`,
    'get-avg-star': (storeId) => `/store/${storeId}/get_avg_star/`,
    'add-reviews': (storeId) => `/store/${storeId}/add_review/`,
    'register-store': '/store/register-store/',
    'comments': (productId) => `/products/${productId}/comments/`,
    'add-comments': (productId) => `/products/${productId}/add_comments/`,
    'sold': (productId) => `/products/${productId}/sold/`,
    'product-details': (productId) => `/products/${productId}`,
    'register-store': '/store/register-store/',
    'pay': '/payment/'
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: Host,
        headers: {
            'Authorization': `Bearer ${accessToken ? accessToken : AsyncStorage.getItem('access-token')}`
        }
    })
}

export default axios.create({
    baseURL: Host
})