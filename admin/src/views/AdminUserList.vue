<template>
    <div>
        <h1>管理员列表</h1>
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
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
                const res = await this.$http.get('/rest/admin_users')
                this.tableData = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定要删除"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/admin_users/${row._id}`)
                    if (res.data.status === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.fetch()
                    }
                })
            }
        }
    };
</script>