import Vue from 'vue'
import Router from 'vue-router'
import EventList from './components/EventList'
import EventDetails from './components/EventDetails'
import AuthForm from './components/AuthForm'
import Favorites from './components/Favorites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Events',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'EventDetails',
      component: EventDetails,
      props: true
    },
    {
      path: '/login',
      name: 'Auth',
      component: AuthForm
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    }
  ]
})