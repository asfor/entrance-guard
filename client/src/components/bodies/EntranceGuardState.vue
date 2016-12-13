<template>
    <div class="body body-entrance-guard">
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
                    <td>楼层</td>
                    <td>房号</td>
                    <td>状态</td>
                </tr>
            </thead>

            <tbody>
                <tr v-for='room in rooms'>
                    <td>{{room.floor}}</td>
                    <td>{{room.ID}}</td>
                    <td>{{room.state}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'EntranceGuard',
    data() {
        return {
            floors: [],
            selected: undefined,
            roomNumber: '',
            rooms: []
        }
    }
}
</script>

<style lang='scss'>
.body-entrance-guard {
    input, select {
        display: inline-block;
        width: 200px;
    }

    &:after {content: '门禁状态';}
    .search {margin-top: -2px;}
}
</style>