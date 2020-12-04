<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" show-password v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async login() {
            const res = await this.$http.post('/login', this.model)
            if(res.data.token) {
                localStorage.token = res.data.token
                this.$message({
                    type: 'success',
                    message: '登录成功'
                })
                this.$router.push('/')
            }
        }
    }
}
</script>


<style scoped>
.login-container{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../assets/wz_bg.jpg') center center no-repeat;
    background-size: cover;   
}
.login-card{
    width: 25rem;
}
.el-card{
    background: rgba(0,0,0,0.1);
    color: #fff;
}
.el-form-item /deep/ .el-form-item__label{
    color:#fff;
}
.el-button {
    display: block;
    margin: 0 auto;
}
</style>

