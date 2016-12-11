<template>
    <div class="body body-node">
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

            <label style="margin-left: 20px;">房号: </label>
            <input type="text" class="form-control" placeholder='房间编号' v-model='nodeName'>

            <button class="btn btn-default search" @click.prevent='onSearch'>查询</button>
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

                <tr v-for='(node, index) in nodes'>
                    <td>{{node.nodeId}}</td>
                    <td>{{node.place}}</td>
                    <td>{{node.nodeName}}</td>
                    <td>{{node.status}}</td>
                    <td>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click='onEdit(index)'>编辑</button>
                        <button class="btn btn-danger" @click='onDelete(index)'>删除</button>
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
                        <h4 class="modal-title">编辑节点信息</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <label style="margin-right:10px;">节点名称:</label>
                            <input class="form-control" type="text" v-model='editNodeName'>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click='onSave(editNodeId)'>确定</button>
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
            // 全局状态
            areas: [],
            areaSelected: undefined,
            nodeName: '',
            nodes: [],

            // 模拟框状态
            editNodeId: undefined,
            editNodeName: undefined
        }
    },

    methods: {
        onEdit(index) {
            this.editNodeId = nodes[index].nodeId
            this.editNodeName = nodes[index].nodeName
        },

        onDelete(index) {
            if(confirm('确定要删除节点？'))
                fetch(`/nodes?area=${this.areaSelected}&nodeId=${nodes[index].nodeId}`, {method: 'DELETE'})
                    .then(response => response.json())
                    .then(({msg}) => alert(msg))
                    .catch(() => alert('请求失败'))
        },

        onSave(nodeId) {
            fetch('/nodes', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    area: this.areaSelected,
                    nodeId,
                    nodeName: this.editNodeName
                })
            }).then(response => response.json())
              .then(({msg}) => alert(msg))
              .catch(() => alert('请求失败'))
        },

        onSearch() {
            if(!areaSelected)
                alert('请选择区域!')
            else {
                let url = `/nodes?area=${this.areaSelected}`

                if(this.nodeName !== '')   url += `&nodeName=${this.nodeName}`

                fetch(url)
                    .then(response => response.json())
                    .then(({data}) => this.nodes = data)
                    .catch(() => alert('请求失败'))
            }
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
.body-node {
    input, select {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '节点信息管理';}
    .search {margin-top: -2px;}
}
</style>