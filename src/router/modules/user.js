export default {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user'),
    children: [{
        path: 'question',
        component: () => import('@/views/user/question')
    }]
}