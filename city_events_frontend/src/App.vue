<template>
  <div id="app">
  
    <nav v-if="$route.name !== 'Auth'">
      <router-link to="/">Главная</router-link>
      <router-link to="/favorites">Избранное</router-link>
      <button @click="logout">Выйти</button>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  }
}
</script>