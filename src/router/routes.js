
const routes = [
    {
        path: '/',
        component: () => import('layouts/AppLayout.vue'),
        children: [
            { path: '', component: () => import('pages/user/Login.vue') }
        ]
    },

    {
        path: '/home',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') }
        ]
    },

    {
        path: '/users',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Users.vue') }
        ]
    },

    {
        path: '/registroscc',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Registros.vue') }
        ]
    },

    {
        path: '/state',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Estate.vue') }
        ]
    },

    {
        path: '/calls',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Calls.vue') }
        ]
    },

    {
        path: '/form',
        name: 'formulario',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Form.vue') }
        ]
    },

]
  
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
