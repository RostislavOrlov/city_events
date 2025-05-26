import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    events: [],
    favorites: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites
    },
    ADD_FAVORITE(state, eventId) {
      state.favorites.push(eventId)
    },
    REMOVE_FAVORITE(state, eventId) {
      state.favorites = state.favorites.filter(id => id !== eventId)
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const user = await AuthService.login(credentials)
      commit('SET_USER', user)
    },
    async register({ commit }, credentials) {
      const user = await AuthService.register(credentials)
      commit('SET_USER', user)
    },
    async fetchEvents({ commit }) {
      const events = await EventService.getAll()
      commit('SET_EVENTS', events)
    },
    async fetchFavorites({ commit }) {
      const favorites = await FavoritesService.getAll()
      commit('SET_FAVORITES', favorites)
    },
    async toggleFavorite({ commit }, eventId) {
      if (this.state.favorites.includes(eventId)) {
        await FavoritesService.remove(eventId)
        commit('REMOVE_FAVORITE', eventId)
      } else {
        await FavoritesService.add(eventId)
        commit('ADD_FAVORITE', eventId)
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    filteredEvents: (state) => (filters) => {
      return state.events.filter(event => {
      })
    }
  }
})