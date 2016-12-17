<template>
    <div class="body body-access">
        <!-- 表单 -->
        <form role="form">
            <label>区域：</label>
            <select class="form-control" v-model='areaSelected'>
                <option v-for='area in areas'>
                    {{area.no}}
                </option>
            </select>

            <label style="margin-left: 20px;">卡号: </label>
            <select class="form-control" v-model='cardSelected'>
                <option></option>
                <option v-for='card in cards'>
                    {{card}}
                </option>
            </select>

            <label style="margin-left: 20px;">节点ID: </label>
            <select class="form-control" v-model='nodeSelected'>
                <option value=""></option>
                <option
                    v-for='node in nodes'
                    :value='node.nodeId'
                >
                    {{node.nodeName}}
                </option>
            </select>

            <button class="btn btn-default search" @click.prevent='onSearch'>查询</button>
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
                <tr v-for='record in records'>
                    <td>{{record.cardNo}}</td>
                    <td>{{record.permissionId}}</td>
                    <td>{{record.nodeId}}</td>
                    <td>{{record.time}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import 'whatwg-fetch'

export default {
    name: 'record',
    data() {
        return {
            areaSelected: undefined,
            cardSelected: undefined,
            nodeSelected: undefined,
            areas: [],
            cards: [],
            nodes: [],
            records: []
        }
    },

    methods: {
        onSearch() {
            if(!this.areaSelected)
                alert('请选择区域!')
            else {
                let url = `/records?area=${this.areaSelected}`
                if(this.cardSelected)    url += `&cardNo=${this.cardSelected}`
                if(this.nodeSelected)    url += `&nodeId=${this.nodeSelected}`

                fetch(url, {credentials: 'same-origin'})
                    .then(response => response.json())
                    .then(({data}) => this.records = data)
                    .catch(() => alert('请求失败'))
            }
        }
    },

    watch: {
        areaSelected(newVal) {
            fetch(`/users?area=${newVal}`, {credentials: 'same-origin'})
                .then(response => response.json())
                .then(({data}) => this.cards = data.map(user => user.cardNo))
                .catch(() => alert('请求失败'))

            fetch(`/nodes?area=${newVal}`, {credentials: 'same-origin'})
                .then(response => response.json())
                .then(({data}) => this.nodes = data)
                .catch(() => alert('请求失败'))
        }
    },

    mounted() {
        fetch('/areas', {credentials: 'same-origin'})
            .then(response => response.json())
            .then(({data}) => this.areas = data)
                .catch(() => alert('请求失败'))
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