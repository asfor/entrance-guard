<template>
    <div class='body body-out-card'>
        <form role="form">
            <div class="form-group">
                <label><span class="import">*</span>卡号</label>
                <input type="text" class="form-control" placeholder="卡号">
            </div>

            <div class="form-group">
                <label><span class="import">*</span>学号/教师ID</label>
                <input type="text" class="form-control" placeholder="学号/教师ID">
            </div>

            <div class="form-group">
                <label><span class="import">*</span>姓名</label>
                <input type="text" class="form-control" placeholder="姓名">
            </div>

            <div class="form-group">
                <label><span class="import">*</span>电话</label>
                <input type="text" class="form-control" placeholder="电话">
            </div>

            <div class="form-group">
                <label>专业</label>
                <input type="text" class="form-control" placeholder="专业">
            </div>

            <div class="form-group">
                <label>性别</label>
                <input type="text" class="form-control" placeholder="性别">
            </div>
            
            <button class="btn btn-default" @click.prevent='submit'>提交</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'outCard',
    methods: {
        submit() {}
    }
}
</script>

<style>
.body-out-card:after {content: "发卡管理";}
</style>