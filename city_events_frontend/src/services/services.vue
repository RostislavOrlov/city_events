import axios from 'axios'

export default {
  async login({ email, password }) {
    const response = await axios.post('/api/auth/login', { email, password })
    return response.data
  },
  async register({ email, password }) {
    const response = await axios.post('/api/auth/register', { email, password })
    return response.data
  }
}

// event.service.js
export default {
  async getAll() {
    const response = await axios.get('/api/events')
    return response.data
  },
  async getById(id) {
    const response = await axios.get(`/api/events/${id}`)
    return response.data
  }
}

// favorites.service.js
export default {
  async getAll() {
    const response = await axios.get('/api/favorites')
    return response.data
  },
  async add(eventId) {
    await axios.post('/api/favorites', { eventId })
  },
  async remove(eventId) {
    await axios.delete(`/api/favorites/${eventId}`)
  }
}