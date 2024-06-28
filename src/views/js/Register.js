import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export function Register() {
    const username = ref('');
    const password = ref('');

    const registerUser = async () => {
        // 确保输入不为空
        if (!username.value || !password.value) {
            alert('Please enter username and password.');
            ElMessage.error('Username and password are required.');
            return;
        }

        try {
            // 发送 POST 请求到服务器注册用户
            const response = await axios.post('http://joi.work/user/register', {
                name: username.value,
                password: password.value
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            // 检查响应数据中的 success 字段
            if (response.data.success) {
                ElMessage.success('User registered successfully');
                // 可能需要重定向或执行其他操作
            } else {
                // 服务器返回了错误信息
                ElMessage.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            // 捕获并显示错误信息
            console.error('Registration failed:', error);
            ElMessage.error('An error occurred during registration.');
        }
    };

    return {
        username,
        password,
        registerUser
    };
}