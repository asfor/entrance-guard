<template>
    <div class="body body-property">
        <!-- 表单 -->
        <form role="form">
            <label>区域：</label>
            <select class="form-control" v-model='areaSelected'>
                <option
                    v-for='area in areas'
                    :value='area.no'
                >
                    {{area.name}}
                </option>
            </select>

            <label style="margin-left: 20px;">姓名: </label>
            <select class="form-control" v-model='userSelected'>
                <option
                    v-for='user in users'
                    :value='user.personId'
                >
                    {{user.name}}
                </option>
            </select>

            <label style="margin-left: 20px;">节点: </label>
            <select class="form-control" v-model='nodeSelected'>
                <option
                    v-for='node in nodes'
                    :value='node.nodeId'
                >
                    {{node.nodeName}}
                </option>
            </select>

            <button class="btn btn-default form-btn" @click.prevent='onSearch'>查询</button>
            <button class="btn btn-info form-btn" data-toggle="modal" data-target="#myModal" @click.prevent>添加</button>
        </form>

        <!-- 数据表格 -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>学号</td>
                    <td>姓名</td>
                    <td>节点ID</td>
                    <td>类型</td>
                    <td>管理</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>ITT13074</td>
                    <td>史宇韬</td>
                    <td>史宇韬</td>
                    <td>史宇韬</td>
                    <td><button class="btn btn-danger">删除</button></td>
                </tr>

                <tr v-for='permission in permissions'>
                    <td>{{permission.personId}}</td>
                    <td>{{permission.name}}</td>
                    <td>{{permission.nodeId}}</td>
                    <td>{{permission.type}}</td>
                    <td><button class="btn btn-danger" @click='onDelete(permission.id)'>删除</button></td>
                </tr>
            </tbody>
        </table>

        <!-- 模拟框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">新增权限</h4>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form">
                            <div class="form-group">
                                <label>用户：</label>
                                <select class="form-control" v-model='modalUserIndex'>
                                    <option
                                        v-for='(user, index) in users'
                                        :value='index'
                                    >
                                        {{user.name}}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>节点：</label>
                                <select class="form-control" v-model='modalNodeId'>
                                    <option
                                        v-for='node in nodes'
                                        :value='node.nodeId'
                                    >
                                        {{node.nodeName}}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>类型：</label>
                                <input type="text" class="form-control" v-model='modalType'>
                            </div>

                            <div class="form-group">
                                <label>开始周期：</label>
                                <input type="date" class="form-control" v-model='modalStartPeriod'>
                            </div>

                            <div class="form-group">
                                <label>结束周期：</label>
                                <input type="date" class="form-control" v-model='modalEndPeriod'>
                            </div>

                            <div class="form-group">
                                <label>开始时间：</label>
                                <input type="time" class="form-control" v-model='modalStartTime'>
                            </div>

                            <div class="form-group">
                                <label>结束时间：</label>
                                <input type="time" class="form-control" v-model='modalEndTime'>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click='onAdd'>确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'whatwg-fetch'

export default {
    name: 'permission',
    data() {
        return {
            // 全局状态
            areaSelected: undefined,
            userSelected: undefined,
            nodeSelected: undefined,
            areas: [],
            users: [],
            nodes: [],
            permissions: [],

            // 模拟框状态
            modalUserIndex: undefined,
            modalCardNo: undefined,
            modalPersonId: undefined,
            modalName: undefined,
            modalNodeId: undefined,
            modalType: undefined,
            modalStartPeriod: undefined,
            modalEndPeriod: undefined,
            modalStartTime: undefined,
            modalEndTime: undefined
        }
    },

    methods: {
        onAdd() {
            const data = {
                area: this.areaSelected,
                cardNo: this.modalCardNo,
                personId: this.modalPersonId,
                name: this.modalName,
                nodeId: this.modalNodeId,
                type: this.modalType,
                startPeriod: this.modalStartPeriod,
                endPeriod: this.modalEndPeriod,
                startTime: this.modalStartTime,
                endTime: this.modalEndTime
            }

            fetch('/permissions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response => response.json())
              .then(({msg}) => alert(msg))
              .catch(() => alert('请求失败'))
        },

        onSearch() {
            if(!this.areaSelected || !this.userSelected || !this.nodeSelected)
                alert('请选择区域、用户和节点')
            else {
                fetch(`/permissions?area=${this.areaSelected}&personId=${this.userSelected}&nodeId=${this.nodeSelected}`)
                    .then(response => response.json())
                    .then(({data}) => this.permissions = data)
                    .catch(() => alert('请求失败'))
            }
        },

        onDelete(id) {
            if(confirm('是否要删除权限？'))
                fetch(`/permissions?area=${this.areaSelected}&id=${id}`, {method: 'DELETE'})
                    .then(response => response.json())
                    .then(({msg}) => alert(msg))
                    .catch(() => alert('请求失败'))
        }
    },

    watch: {
        areaSelected(newVal) {
            fetch(`/users?area=${this.areaSelected}`)
                .then(response => response.json())
                .then(({data}) => this.users = data)
                .catch(() => alert('请求失败'))

            fetch(`/nodes?area=${this.areaSelected}`)
                .then(response => response.json())
                .then(({data}) => this.nodes = data)
                .catch(() => alert('请求失败'))
        },

        modalUserIndex(newVal) {
            const user = this.users[newVal]

            this.modalCardNo    = user.cardNo
            this.modalPersonId  = user.personId
            this.modalName      = user.name
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
.body-property {
    input, select {
        display: inline-block;
        width: 200px;
    }

    .modal-form {
        text-align: center;

        label {width: 80px;}
        input, select {width: 200px;}
    }

    &:after {content: '权限管理';}
    .form-btn {margin-top: -2px;}
}
</style>