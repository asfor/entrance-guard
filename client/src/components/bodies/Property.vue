<template>
    <div class="body body-property">
        <!-- 表单 -->
        <form role="form">
            <label>姓名: </label>
            <input type="text" class="form-control" placeholder='姓名' v-model='name'>

            <button class="btn btn-default search" @click.prevent='search'>查询</button>
        </form>

        <!-- 数据表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>学号</td>
                    <td>姓名</td>
                    <td>管理</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>ITT13074</td>
                    <td>史宇韬</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Property',
    data() { return {name: ''} }
} 
</script>

<style lang='scss'>
.body-property {
    input {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '权限管理';}
    .search {margin-top: -2px;}
}
</style>