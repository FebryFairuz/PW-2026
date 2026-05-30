import React from 'react'
import { RequestAPI } from '@/hooks/RequestAPI'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;
// const TOKEN = localStorage.getItem('accessToken');
const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

const GET_ALL_BOOK = () => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/books`, HEADERS)
}

const CREATE_BOOK = (payload) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('POST', `${API_URL}/api/books`, HEADERS, payload)
}

const GET_BOOK_BY_ID = (book_id) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('GET', `${API_URL}/api/books/${book_id}`, HEADERS)
}

const UPDATE_BOOK = (book_id, payload) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data',
    }
    return RequestAPI('PUT', `${API_URL}/api/books/${book_id}`, HEADERS, payload)
}

const DELETE_BOOK = (book_id) => {
    const TOKEN = getToken();
    const HEADERS = {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
    return RequestAPI('DELETE', `${API_URL}/api/books/${book_id}`, HEADERS)
}

export { GET_ALL_BOOK, GET_BOOK_BY_ID, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK }