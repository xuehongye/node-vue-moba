<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}文章</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">{{ id ? '保存' : '新建' }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        VueEditor
    } from "vue2-editor";
    export default {
        props: {
            id: {}
        },
        components: {
            VueEditor
        },
        data() {
            return {
                model: {},
                categories: []
            }
        },
        created() {
            this.id && this.fetch()
            this.fetchCategories()
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);

                const result = await this.$http.post('/upload', formData)
                let url = result.data.url; // Get url from response
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
            },
            async fetch() {
                const res = await this.$http.get(`/rest/articles/${this.id}`)
                this.model = res.data
            },
            async fetchCategories() {
                const res = await this.$http.get(`/rest/categories`)
                this.categories = res.data
            },
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        })
                        this.$router.push('/articles/list')
                    }
                } else {
                    res = await this.$http.post('/rest/articles', this.model)
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '新建成功'
                        })
                        this.$router.push('/articles/list')
                    }
                }
            }
        }
    }
</script>