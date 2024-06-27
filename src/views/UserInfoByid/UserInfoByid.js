import { ref } from 'vue';
import { ElInput, ElButton, ElCard } from 'element-plus';
import axios from 'axios';

export default {
    name: 'Manage',
    components: {
        ElInput,
        ElButton,
        ElCard
    },
    metaInfo: {
        title: 'User Info by ID'
    },
    setup() {
        const userId = ref(''); // 用户ID输入
        const profileInfo = ref(''); // 用于存储和显示用户信息

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