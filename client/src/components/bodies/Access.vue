<template>
    <div class="body body-access">
        <!-- 表单 -->
        <form role="form">
            <label>节点ID: </label>
            <select class="form-control" v-model='selected'>
                <option
                    v-for='node in nodes'
                    :value='node.value'
                >
                    {{node.name}}
                </option>
            </select>

            <button class="btn btn-default search" @click.prevent='search'>查询</button>
        </form>

        <!-- 数据表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>卡号</td>
                    <td>权限ID</td>
                    <td>节点</td>
                    <td>时间</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>871928741</td>
                    <td>3</td>
                    <td>芙蓉1#518</td>
                    <td>2012-02-02</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'access',
    data() {
        return {
            selected: undefined,
            nodes: []
        }
    },

    methods: {
        search() {}
    }
}
</script>

<style lang='scss'>
.body-access {
    select {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '用户出入记录';}
    .search {margin-top: -2px;}
}
</style>