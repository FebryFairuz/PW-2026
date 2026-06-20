import { RequestAPI } from '@/hooks/request-api'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

const LOG_IN = (payload) => {
    const HEADERS = {
        'Content-Type': 'application/json'
    }
    return RequestAPI('POST', `${API_URL}/api/users/login`, HEADERS, payload, true);
}

const GET_ALL_USER = () => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/users`, HEADERS)
}

const CREATE_USER = (payload) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('POST', `${API_URL}/api/users`, HEADERS, payload)
}

const GET_USER_BY_ID = (user_id) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/users/${user_id}`, HEADERS)
}

const UPDATE_USER = (user_id, payload) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('PUT', `${API_URL}/api/users/${user_id}`, HEADERS, payload)
}

const DELETE_USER = (user_id) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('DELETE', `${API_URL}/api/users/${user_id}`, HEADERS)
}

export { LOG_IN, GET_ALL_USER, GET_USER_BY_ID, CREATE_USER, UPDATE_USER, DELETE_USER }