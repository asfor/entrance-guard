<template>
    <div class="body body-user">
        <!-- 表单 -->
        <form role='form'>
            <label>区域：</label>
            <select class="form-control" v-model='areaSelected'>
                <option
                    v-for='area in areas'
                    :value='area.no'
                >
                    {{area.name}}
                </option>
            </select>

            <label style="margin-left: 20px;">姓名：</label>
            <input type="text" class="form-control" placeholder='姓名' v-model='name'>

            <button class="btn btn-default search" @click.prevent='onSearch'>查询</button>
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

                <tr v-for='(user, index) in users'>
                    <td>{{user.cardNo}}</td>
                    <td>{{user.personId}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.phone}}</td>
                    <td>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click='onEdit(index)'>编辑</button>
                        <button class="btn btn-danger" @click='onDelete(user.cardNo)'>删除</button>
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
                        <h4 class="modal-title">编辑用户信息</h4>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form">
                            <div class="form-group">
                                <label>卡号：</label>
                                <input type="text" class='form-control' readonly='readonly' :value='modalCardNo'>
                            </div>

                            <div class="form-group">
                                <label>学号：</label>
                                <input type="text" class="form-control" v-model='modalPersonId'>
                            </div>

                            <div class="form-group">
                                <label>姓名：</label>
                                <input type="text" class="form-control" v-model='modalName'>
                            </div>

                            <div class="form-group">
                                <label>电话：</label>
                                <input type="text" class="form-control" v-model='modalPhone'>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click='onSave'>确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'whatwg-fetch'

export default {
    name: 'users',
    data() {
        return {
            // 全局属性
            areaSelected: undefined,
            areas: [],
            name: '',
            users: [],

            // 模拟框属性
            modalCardNo: undefined,
            modalPersonId: undefined,
            modalName: undefined,
            modalPhone: undefined
        }
    },

    methods: {
        onSearch() {
            if(!areaSelected)
                alert('请选择区域!')
            else {
                fetch(`/users?area=${this.areaSelected}&name=${this.name}`)
                    .then(response => response.json())
                    .then(({data}) => this.users = data)
                    .catch(() => alert('请求失败'))
            }
        },

        onEdit(index) {
            const user = this.users[index]

            this.modalCardNo = user.cardNo
            this.modalPersonId = user.personId
            this.modalName = user.name
            this.modalPhone = user.phone
        },

        onSave() {
            const data = {
                area: this.areaSelected,
                cardNo: this.modalCardNo,
                personId: this.modalPersonId.toLowerCase(),
                name: this.modalName,
                phone: this.modalPhone
            }

            fetch('/users', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response => response.json())
              .then(({msg}) => alert(msg))
              .catch(() => alert('请求失败'))
        },

        onDelete(cardNo) {
            if(confirm('确定要删除用户?'))
                fetch(`/users?cardNo=${cardNo}`, {method: 'DELETE'})
                    .then(response => response.json())
                    .then(({msg}) => alert(msg))
                    .catch(() => alert('请求失败'))
        }
    },

    mounted() {
        fetch('/areas')
            .then(response => response.json())
            .then(({data}) => this.areas = data)
            .catch(() => alert('请求失败'))
    }
}
</script>

<style lang='scss'>
.body-user {
    input, select {
        display: inline-block;
        width: 200px;
    }

    .modal-form {
        text-align: center;

        label {width: 80px;}
        input, select {width: 200px;}
    }
    
    &:after {content: '用户信息管理';}
    .search {margin-top: -2px;}
}
</style>