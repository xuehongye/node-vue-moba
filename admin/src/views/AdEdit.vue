<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
        <el-form label-width="124px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" @click="model.items.push({})" style="margin-bottom: 1rem">
                    <i class="el-icon-plus">添加广告</i>
                </el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col :md="24" v-for="(item, index) in model.items" :key="index">
                        <el-form-item label="跳转链接（URL）">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload class="avatar-uploader" :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false" :on-success="res => $set(item, 'image', res.url)">
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="操作">
                            <el-button size='small' type="danger" @click="model.items.splice(index, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                model: {
                    items: []
                },
            }
        },
        created() {
            this.id && this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/rest/ads/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        })
                        this.$router.push('/ads/list')
                    }
                } else {
                    res = await this.$http.post('/rest/ads', this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '新建成功'
                        })
                        this.$router.push('/ads/list')
                    }
                }
            }
        }
    }
</script>

<style>
.el-col .el-form-item{
    margin-bottom: 10px;
}
</style>
