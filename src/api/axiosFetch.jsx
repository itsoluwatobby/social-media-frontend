import axios from 'axios'
const AUTH_URL = 'http://localhost:5000/api/auth';
const USERS_URL = 'http://localhost:5000/api/users';
const POSTS_URL = 'http://localhost:5000/api/posts';
const CONVERSATIONS_URL = 'http://localhost:5000/api/conversation';
const MESSAGE_URL = 'http://localhost:5000/api/message';


export const authUsers = axios.create({
   baseURL: AUTH_URL,
   headers: {'Content-Type': 'application/json'}
})

export const fetchUsers = axios.create({
   baseURL: USERS_URL,
})

export const getPosts = axios.create({
   baseURL: POSTS_URL,
})

export const conversationUrl = axios.create({
   baseURL: CONVERSATIONS_URL,
})

export const messageUrl = axios.create({
   baseURL: MESSAGE_URL,
})

export const axiosPrivate = axios.create({
   baseURL: 'http://localhost:5000/api',
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true
})
