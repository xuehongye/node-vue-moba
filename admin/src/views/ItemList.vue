<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="name" label="物品名称">
            </el-table-column>
            <el-table-column prop="icon" label="物品图标">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
                const res = await this.$http.get('/rest/items')
                this.tableData = res.data
            },
            async remove(id) {
                const res = await this.$http.delete(`/rest/items/${id}`)
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

<style>
    img{
        height: 3rem;
    }
</style>
