<template>
    <div class="login-container">
        <h2>Login</h2>
        <el-form ref="loginForm" label-width="100px">
            <el-form-item label="Username">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
    },
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');
        const handleLogin = async () => {
            try {
                const response = await axios.post('http://joi.work/user/login', {
                    name: username.value,
                    password: password.value
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                // 登录成功，处理响应数据
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token); // 保存token
                    // 执行其他登录成功后的操作，例如跳转到主页
                    router.push('/manage'); // 跳转到管理页面
                }
            } catch (error) {
                console.error('Login failed:', error);
                // 处理错误，例如显示错误消息
            }
        };
        // 设置请求头的拦截器
        const setAuthHeader = (token) => {
            axios.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            }, error => {
                return Promise.reject(error);
            });
        };
        const cleanAuthHeader = () => {
            axios.interceptors.request.eject(authInterceptorId);
        };
        // 获取拦截器 ID
        let authInterceptorId = null;
        if (!authInterceptorId) {
            authInterceptorId = axios.interceptors.request.use(setAuthHeader(localStorage.getItem('authToken')), () => { });
        }
        return {
            username,
            password,
            handleLogin
        };
    }
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>