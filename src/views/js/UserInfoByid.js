import { ref } from 'vue';
import axios from 'axios';


export function UserInfoByid() {
    const userId = ref(''); // 用户ID输入
    const profileInfo = ref(''); // 用于存储和显示用户信息
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
    const fetchProfile = async () => {
        if (!userId.value) {
            alert('Please enter a user ID.');
            return;
        }

        try {
            const response = await axios.get(`http://joi.work/user/profile/${userId.value}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            profileInfo.value = JSON.stringify(response.data, null, 2); // 格式化输出
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            profileInfo.value = 'Failed to fetch profile.';
        }
    };

    return {
        userId,
        profileInfo,
        fetchProfile,
    };
}