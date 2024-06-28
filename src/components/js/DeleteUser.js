// DeleteUser.js
import { ref } from 'vue';
import axios from 'axios';

export function DeleteUser() {
    const deleteUserId = ref(''); // 用户ID输入
    const authToken = ref(localStorage.getItem('authToken')); // 从localStorage获取token

    // 设置请求头的拦截器
    axios.interceptors.request.use(config => {
        if (authToken.value) {
            config.headers.Authorization = `Bearer ${authToken.value}`;
        }
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';
        return config;
    }, error => {
        return Promise.reject(error);
    });

    const deleteUser = async (userId) => {
        if (!deleteUserId.value) {
            alert('Please enter a user ID.');
            return;
        }
        userId = parseInt(deleteUserId.value, 10); // 转换为数字
        try {
            const response = await axios.post('http://joi.work/admin/deleteUser', {
                id: userId
            });
            console.log(response)
            if (response.status == 200) {
                alert('成功删除用户！');
            } else {
                alert('删除用户失败！');
            }
        } catch (error) {
            console.error('Delete user failed:', error);
            alert(error.response.data.error);
        }
    };

    return {
        deleteUserId,
        deleteUser
    };
}