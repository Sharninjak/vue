import { ref } from 'vue';
import axios from 'axios';

export function UserList() {
    const authToken = ref(localStorage.getItem('authToken')); // 从localStorage获取token
    // console.log(authToken.value);
    // 设置请求头的拦截器
    axios.interceptors.request.use(config => {
        if (authToken.value) {
            config.headers.Authorization = `Bearer ${authToken.value}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    const users = ref([]); // 用于存储用户列表

    const listUser = async () => {
        try {
            const response = await axios.get('http://joi.work/admin/listUsers', {
                headers: {
                    'Accept': '*/*'
                }
            });
            users.value = response.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            alert('获取用户列表失败');
        }
    };

    return {
        users,
        listUser
    };
}
