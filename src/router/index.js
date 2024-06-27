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
    }
];

// 创建路由器实例
// mode: 'history' 需要替换为 createWebHistory 或 createWebHashHistory
// 根据你的应用是否需要history模式或hash模式
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// 导出路由器实例
export default router;