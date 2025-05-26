<!-- EventDetails.vue -->
<template>
  <div class="event-details" v-if="event">
    <h1>{{ event.title }}</h1>
    <p class="date">{{ event.date }}</p>
    <p class="location">{{ event.location }}</p>
    <p class="price">{{ event.price }} руб.</p>
    <div class="description">{{ event.description }}</div>
    <button @click="$router.go(-1)">Назад</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  async created() {
    const response = await this.$axios.get(`/api/events/${this.id}`)
    this.event = response.data
  }
}
</script>