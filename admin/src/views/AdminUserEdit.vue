<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">{{ id ? '保存' : '新建' }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                parents: []
            }
        },
        created() {
            this.id && this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/rest/admin_users/${this.id}`)
                this.model = res.data
            },
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        })
                        this.$router.push('/admin_users/list')
                    }
                } else {
                    res = await this.$http.post('/rest/admin_users', this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '新建成功'
                        })
                        this.$router.push('/admin_users/list')
                    }
                }
            }
        }
    }
</script>