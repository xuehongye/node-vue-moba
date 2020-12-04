<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="parent.name" label="上级分类">
            </el-table-column>
            <el-table-column prop="name" label="分类名称">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/categories')
                this.tableData = res.data
            },
            async remove(id) {
                const res = await this.$http.delete(`/rest/categories/${id}`)
                if (res.data.status === 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.fetch()
                }
            }
        }
    };
</script>