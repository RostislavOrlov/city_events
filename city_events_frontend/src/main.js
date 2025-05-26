import axios from 'axios'

axios.defaults.baseURL = ''
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.commit('SET_USER', null)
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
