const routes = [
    {
        path: '/',
        component: () => import('layouts/AppLayout.vue'),
        children: [
            {   
                name: 'Login',
                path: '', component: () => import('pages/user/Login.vue')
            }
        ],
    },

    {
        path: '/home',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                name: 'Home',
                path: '', component: () => import('pages/Index.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
    },

    {
        path: '/users',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                name: 'Users',
                path: '', component: () => import('pages/Users.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
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
            { 
                name: 'Map',
                path: '', component: () => import('pages/Estate.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
    },

    {
        path: '/calls',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                name: 'Calls',
                path: '', component: () => import('pages/Calls.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
    },

    {
        path: '/tracing',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                name: 'Tracing',
                path: '', component: () => import('pages/Tracing.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
    },

    {
        path: '/form',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                name: 'Form',
                path: '', component: () => import('pages/Form.vue') 
            }
        ],
        meta: {
            autenticated: true,
        }
    },

    {
        path: '/register',
        component: () => import('layouts/AppLayout.vue'),
        children: [
            {   
                name: 'Register',
                path: '', component: () => import('pages/user/Register.vue')
            }
        ],
    },

    {
        path: '/error',
        component: () => import('layouts/AppLayout.vue'),
        children: [
            {   
                name: 'Error',
                path: '', component: () => import('pages/user/Error.vue')
            }
        ],
        meta: {
            autenticated: true,
        }
    },
    {
        path: '/form2',
        props:{default:true},
        name: 'formulario2',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Form2.vue') }
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
