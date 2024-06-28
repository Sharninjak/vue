import { ref } from 'vue';
import axios from 'axios';

export function Register() {
    const username = ref('');
    const password = ref('');

    const registerUser = async () => {
        // 确保输入不为空
        if (!username.value || !password.value) {
            alert('Please enter username and password.');
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
            console.log(response.data);
            if (response.data.token) {
                alert('Registration successful');
                // 可能需要重定向或执行其他操作
            }
        } catch (error) {
            // 捕获并显示错误信息
            console.error('Registration failed:', error);
            alert(error.response.data.error);
        }
    };

    return {
        username,
        password,
        registerUser
    };
}