<template>
    <div>
        <my-title />
        <sidebar ref='sidebar' @toggle='toggle'/>
        <main-body ref='mainBody'/>
    </div>
</template>

<script>
import Promise from 'promise'
import MyTitle from './components/Title'
import Sidebar from './components/Sidebar'
import MainBody from './components/MainBody'
import {initView} from './config'

window.Promise = Promise

export default {
    name: 'app',
    methods: {
        toggle(key, index) {
            this.$refs.sidebar.$emit('toggleActive', index)
            this.$refs.mainBody.$emit('toggle', key)
        }
    },

    components: {
        MyTitle,
        Sidebar,
        MainBody
    },

    mounted() { this.toggle(initView.component, initView.index) }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    outline: none;
}

html, body {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    font-family: "Helvetica Neue", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
}

@font-face {
    font-family: 'icomoon';
    src: url(./assets/icomoon.woff) format('woff');
    font-weight: normal;
    font-size: normal;
}
</style>