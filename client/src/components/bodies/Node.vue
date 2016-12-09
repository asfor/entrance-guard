<template>
    <div class="body body-node">
        <!-- 表单 -->
        <form role='form'>
            <label>楼层: </label>
            <select class="form-control" v-model='selected'>
                <option
                    v-for='floor in floors'
                    :value='floor.value'
                >
                    {{floor.name}}
                </option>
            </select>

            <label style="margin-left: 20px;">房号: </label>
            <input type="text" class="form-control" placeholder='房间编号' v-model='roomNumber'>

            <button class="btn btn-default search" @click.prevent='search'>查询</button>
        </form>


        <!-- 数据表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>节点ID</td>
                    <td>楼层</td>
                    <td>房号</td>
                    <td>状态</td>
                    <td>时间</td>
                    <td>操作</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>123123</td>
                    <td>3</td>
                    <td>518</td>
                    <td>装修中</td>
                    <td>2010-00-00</td>
                    <td>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>
                <tr>
                    <td>123123</td>
                    <td>3</td>
                    <td>518</td>
                    <td>装修中</td>
                    <td>2010-00-00</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>
                <tr>
                    <td>123123</td>
                    <td>3</td>
                    <td>518</td>
                    <td>装修中</td>
                    <td>2010-00-00</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>

                <tr v-for='node in nodes'>
                    <td>{{node.cardID}}</td>
                    <td>{{node.studentID}}</td>
                    <td>{{node.name}}</td>
                    <td>{{node.phone}}</td>
                    <td>
                        <button class="btn btn-primary" @click='edit(node.cardID)'>编辑</button>
                        <button class="btn btn-danger" @click='delete(node.cardID)'>删除</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- 模拟框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <p>One fine body&hellip;</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'node',
    data() {
        return {
            floors: [],
            selected: undefined,
            roomNumber: '',
            nodes: []
        }
    },

    created() {}
}
</script>

<style lang='scss'>
.body-node {
    input, select {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '节点信息管理';}
    .search {margin-top: -2px;}
}
</style>