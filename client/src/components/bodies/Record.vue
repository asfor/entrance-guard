<template>
    <div class="body body-access">
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

            <label style="margin-left: 20px;">卡号: </label>
            <select class="form-control" v-model='cardSelected'>
                <option
                    v-for='card in cards'
                    :value='card.cardId'
                >
                    {{node.nodeName}}
                </option>
            </select>

            <label style="margin-left: 20px;">节点ID: </label>
            <select class="form-control" v-model='nodeSelected'>
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
                <tr>
                    <td>871928741</td>
                    <td>312312</td>
                    <td>芙蓉1#518</td>
                    <td>2012-02-02</td>
                </tr>

                <tr v-for='record in records'>
                    <td>record.cardNo</td>
                    <td>record.permissionId</td>
                    <td>record.nodeId</td>
                    <td>record.time</td>
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
            if(!this.areaSelected || !this.cardSelected || !this.nodeSelected)
                alert('请选择区域、卡号和节点')
            else
                fetch(`/records?area=${this.areaSelected}&card=${this.cardSelected}&node=${this.nodeSelected}`)
                    .then(response => response.json())
                    .then(({data}) => this.records = data)
                    .catch(() => alert('请求失败'))
        }
    },

    watch: {
        areaSelected(newVal) {
            fetch(`/users?area=${this.areaSelected}`)
                .then(response => response.json())
                .then(({data}) => this.cards = data.map(user => user.cardNo))
                .catch(() => alert('请求失败'))

            fetch(`/nodes?area=${this.areaSelected}`)
                .then(response => response.json())
                .then(({data}) => this.nodes = data)
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
.body-access {
    select {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '用户出入记录';}
    .search {margin-top: -2px;}
}
</style>