<!-- AuthForm.vue -->
<template>
  <div class="auth-form">
    <h2>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль" required>
      <button type="submit">{{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}</button>
      <button type="button" @click="toggleMode">
        {{ isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoginMode: true
    }
  },
  methods: {
    async handleSubmit() {
      const url = this.isLoginMode ? '/api/auth/login' : '/api/auth/register'
      try {
        const response = await this.$axios.post(url, {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('authToken', response.data.token)
        this.$router.push('/')
      } catch (error) {
        console.error('Ошибка аутентификации:', error)
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode
    }
  }
}
</script>