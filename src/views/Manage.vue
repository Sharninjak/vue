<template>

    <div class="profile-fetcher">
        <button class="logout-button" @click="logoutAndRedirect">Logout</button>
        <el-card>
            <h3>Profile Information</h3>
            <div class="input-area">
                <el-button type="primary" @click="fetchProfile">Fetch Profile</el-button>
                <el-input v-model="userId" placeholder="Enter user ID"></el-input>
            </div>
            <div class="output-area">
                <el-card>
                    <div class="pre-scrollable">
                        <pre>{{ profileInfo }}</pre>
                    </div>
                </el-card>
            </div>
        </el-card>
        <el-card>
            <h3>User List</h3>
            <div class="input-area">
                <el-button type="primary" @click="listUser">Fetch all user</el-button>
            </div>
            <div class="output-area">
                <el-card>
                    <div class="pre-scrollable">
                        <pre>{{ users }}</pre>
                    </div>
                </el-card>
            </div>
        </el-card>
        <el-card>
            <h3>User Register</h3>
            <div class="input-area">
                <el-button type="primary" @click="registerUser">Register</el-button>
                <el-input v-model="username" placeholder="Username"></el-input>
                <el-input v-model="password" placeholder="Password"></el-input>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ElInput, ElButton, ElCard } from 'element-plus';
import { UserInfoByid } from './js/UserInfoByid';
import { UserList } from './js/UserList';
import { Register } from './js/Register';

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
        const { userId, profileInfo, fetchProfile } = UserInfoByid();
        const { users, listUser } = UserList();
        const { username, password, registerUser } = Register();
        return {
            userId,
            profileInfo,
            fetchProfile,
            users,
            listUser,
            username,
            password,
            registerUser
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

.pre-scrollable {
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    margin: 0;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: pre-wrap;
    /* 保持空格和换行符 */
    word-wrap: break-word;
    /* 长单词换行 */
}
</style>