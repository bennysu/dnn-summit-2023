import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/agenda'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/agenda'
      },
      {
        path: 'agenda',
        component: () => import('@/views/AgendaPage.vue')
      },
      {
        path: 'speakers',
        component: () => import('@/views/SpeakersPage.vue')
      },
      {
        path: 'sponsors',
        component: () => import('@/views/SponsorsPage.vue')
      },
      {
        path: 'swag',
        component: () => import('@/views/SwagPage.vue')
      }
    ]
  },
  {
    path: '/session/',
    component: () => import ('@/views/SessionDetailsPage.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/agenda'
      },
      {
        path: ':id',
        name: 'Session',
        component: () => import ('@/views/SessionDetailsPage.vue')
      },
    ]
  },
  {
    path: '/speaker/',
    component: () => import ('@/views/SpeakerDetailsPage.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/speakers'
      },
      {
        path: ':id',
        name: 'Speaker',
        component: () => import ('@/views/SpeakerDetailsPage.vue')
      },
    ]
  },
  {
    path: '/sponsor/',
    component: () => import ('@/views/SponsorDetailsPage.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/sponsors'
      },
      {
        path: ':id',
        name: 'Sponsor',
        component: () => import ('@/views/SponsorDetailsPage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
