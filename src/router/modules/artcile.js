export default {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article'),
    children: [{
        path: 'detail/:id' + '.html',
        component: () => import('@/views/article/detail')
    }]
}