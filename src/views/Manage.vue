<template>

    <div class="profile-fetcher">
        <button class="logout-button" @click="logoutAndRedirect">Logout</button>
        <el-card>
            <div class="input-area">
                <el-input v-model="userId" placeholder="Enter user ID"></el-input>
                <el-button type="primary" @click="fetchProfile">Fetch Profile</el-button>
            </div>
            <div class="output-area">
                <el-card>
                    <h3>Profile Information</h3>
                    <pre>{{ profileInfo }}</pre>
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ref } from 'vue';
import { ElInput, ElButton, ElCard } from 'element-plus';
import axios from 'axios';

export default {
    name: 'Manage',
    requiresAuth: true,
    components: {
        ElInput,
        ElButton,
        ElCard
    },
    metaInfo: {
        title: 'Manage'
    },
    methods: {
        // 退出登录并重定向到登录界面
        logoutAndRedirect() {
            // 清除本地存储中的 token 或执行其他退出登录的逻辑
            localStorage.removeItem('authToken');
            // 跳转到登录界面
            this.$router.push({ name: 'Login' });
        },
    },
    setup() {
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
            fetchProfile
        };
    }
};

</script>

<style scoped>
.profile-fetcher {
    max-width: 600px;
    margin: 20px auto;
}

.input-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.output-area {
    margin-top: 20px;
}

/* 将退出按钮放在右上角 */
.logout-button {
    position: fixed;
    top: 10px;
    /* 可根据实际情况调整 */
    right: 10px;
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #e53935;
}
</style>