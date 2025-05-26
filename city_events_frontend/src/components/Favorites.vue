<template>
  <div class="favorites">
    <h2>Избранные мероприятия</h2>
    <div v-if="$store.state.favorites.length === 0" class="empty">
      Нет избранных мероприятий
    </div>
    <div v-else class="favorites-list">
      <div v-for="eventId in $store.state.favorites" :key="eventId" class="favorite-item">
        <router-link :to="`/event/${eventId}`">
          {{ getEventTitle(eventId) }}
        </router-link>
        <button @click="toggleFavorite(eventId)">✕</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    eventsMap() {
      return this.$store.state.events.reduce((acc, event) => {
        acc[event.id] = event
        return acc
      }, {})
    }
  },
  methods: {
    getEventTitle(eventId) {
      return this.eventsMap[eventId]?.title || 'Неизвестное мероприятие'
    },
    toggleFavorite(eventId) {
      this.$store.dispatch('toggleFavorite', eventId)
    }
  }
}
</script>