<template>
  <div class="event-list">
    <div class="filters">
      <input v-model="searchQuery" placeholder="Поиск...">
      <select v-model="selectedType">
        <option value="">Все типы</option>
        <option v-for="type in eventTypes" :key="type">{{ type }}</option>
      </select>
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-else class="events">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} | {{ event.location }}</p>
        <router-link :to="`/event/${event.id}`">Подробнее</router-link>
        <button @click="toggleFavorite(event.id)">
          {{ isFavorite(event.id) ? '★' : '☆' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      loading: true,
      searchQuery: '',
      selectedType: '',
      eventTypes: ['Концерт', 'Выставка', 'Спорт'],
      favorites: []
    }
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesType = this.selectedType ? event.type === this.selectedType : true
        return matchesSearch && matchesType
      })
    }
  },
  async created() {
    await this.fetchEvents()
    await this.fetchFavorites()
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await this.$axios.get('/api/events')
        this.events = response.data
      } finally {
        this.loading = false
      }
    },
    async fetchFavorites() {
      const response = await this.$axios.get('/api/favorites')
      this.favorites = response.data
    },
    isFavorite(eventId) {
      return this.favorites.includes(eventId)
    },
    async toggleFavorite(eventId) {
      if (this.isFavorite(eventId)) {
        await this.$axios.delete(`/api/favorites/${eventId}`)
      } else {
        await this.$axios.post('/api/favorites', { eventId })
      }
      await this.fetchFavorites()
    }
  }
}
</script>