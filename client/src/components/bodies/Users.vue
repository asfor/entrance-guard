<template>
    <div class="body body-user">
        <!-- 表单 -->
        <form role='form'>
            <label>专业: </label>
            <select class="form-control" v-model='selected'>
                <option
                    v-for='specialty in specialties'
                    :value='specialty.value'
                >
                    {{specialty.name}}
                </option>
            </select>

            <label style="margin-left: 20px;">姓名: </label>
            <input type="text" class="form-control" placeholder='姓名' v-model='name'>

            <button class="btn btn-default search" @click.prevent='search'>查询</button>
        </form>


        <!-- 数据表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>卡号</td>
                    <td>学号</td>
                    <td>姓名</td>
                    <td>电话</td>
                    <td>操作</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>123123</td>
                    <td>ITT13074</td>
                    <td>史宇韬</td>
                    <td>18064563100</td>
                    <td>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>
                <tr>
                    <td>123123</td>
                    <td>ITT13074</td>
                    <td>史宇韬</td>
                    <td>18064563100</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>
                <tr>
                    <td>123123</td>
                    <td>ITT13074</td>
                    <td>史宇韬</td>
                    <td>18064563100</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <button class="btn btn-danger">删除</button>
                    </td>
                </tr>

                <tr v-for='user in users'>
                    <td>{{user.cardID}}</td>
                    <td>{{user.studentID}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.phone}}</td>
                    <td>
                        <button class="btn btn-primary" @click='edit(user.cardID)'>编辑</button>
                        <button class="btn btn-danger" @click='delete(user.cardID)'>删除</button>
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
// import 'whatwg-fetch'

export default {
    name: 'users',
    data() {
        return {
            specialties: [],
            selected: undefined,
            name: '',
            users: []
        }
    },

    methods: {
        search() {},
        edit(cardID) {},
        delete(cardID) {}
    },

    created() {}
}
</script>

<style lang='scss'>
.body-user {
    input, select {
        display: inline-block;
        width: 200px;
    }
    
    &:after {content: '用户信息管理';}
    .search {margin-top: -2px;}
}
</style>