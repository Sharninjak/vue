// 导入 Vue 和 Vue Router
import { createRouter, createWebHistory } from 'vue-router';


// 创建路由对象
const routes = [
    {
        path: '/', // Vue 3 中路径应该是字符串
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login', // 同样，路径应该是字符串
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/manage',
        name: 'Manage',
        component: () => import('@/views/Manage.vue')
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/views/layout.vue')
    }
];

// 创建路由器实例
// mode: 'history' 需要替换为 createWebHistory 或 createWebHashHistory
// 根据你的应用是否需要history模式或hash模式
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (requiresAuth && !isAuthenticated) {
        // 如果用户未登录但尝试访问需要登录的页面，则重定向到登录页面
        next('/login');
    } else {
        next(); // 允许访问当前页面
    }
});

// 导出路由器实例
export default router;