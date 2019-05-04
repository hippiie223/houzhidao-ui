import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/article',
            name: 'home',
            component: () => import('@/views/article')
        },

        {
            path: '/article/detail/:id',
            name: 'articleDetail',
            component: () => import('@/views/article/detail')
        },

        {
            path: '/article/publish',
            name: 'articlePublush',
            component: () => import('@/views/article/publish')
        },

        {
            path: '/question',
            name: 'question',
            component: () => import('@/views/question')
        },

        {
            path: '/question/detail/:id',
            name: 'questionDetail',
            component: () => import('@/views/question/detail')
        },

        {
            path: '/question/ask',
            name: 'askQuestion',
            component: () => import('@/views/question/ask')
        },

        {
            path: '/topic',
            name: 'topic',
            component: () => import('@/views/topic')
        },

        {
            path: '/topic/detail/:id',
            name: 'topicDetail',
            component: () => import('@/views/topic/detail')
        },

        {
            path: '/exercise',
            name: 'exercise',
            component: () => import('@/views/exercise')
        },

        {
            path: '/exercise/detail/:id',
            name: 'exerciseDetail',
            component: () => import('@/views/exercise/detail')
        },

        {
            path: '/exercise/analysis/:id',
            name: 'exerciseAnalisis',
            component: () => import('@/views/exercise/analysis')
        },

        {
            path: '/video',
            name: 'video',
            component: () => import('@/views/video')
        },

        {
            path: '/video/detail/:id',
            name: 'videoDetail',
            component: () => import('@/views/video/detail')
        },

        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/user'),
            children: [{
                path: 'home',
                component: () => import('@/views/user/home')
            }, {
                path: 'question',
                component: () => import('@/views/user/question')
            }, {
                path: 'exercise',
                component: () => import('@/views/user/exercise')
            }, {
                path: 'video',
                component: () => import('@/views/user/video')
            }, {
                path: 'attend',
                component: () => import('@/views/user/attend')
            }, {
                path: 'fans',
                component: () => import('@/views/user/fans')
            }]
        }
    ]
})
