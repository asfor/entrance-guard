<template>
    <div id="title">
        <h1>{{title}}</h1>
        <div class="exit" @click='onExit'>
            {{exit.title}}
        </div>
    </div>
</template>

<script>
import {title, exit} from '../config'

export default {
    name: 'myTitle',
    data() {
        return {
            title,
            exit
        }
    },

    methods: {
        onExit() {
            if(confirm('确定要退出系统？'))
                window.location.href += this.exit.route
        }
    }
}
</script>

<style lang='scss'>
#title {
    $margin: 20px;
    $height: 32px;

    position: fixed;
    width: 100%;
    height: $height;
    line-height: $height;
    color: #fff;
    background-color: #23282d;
    z-index: 1;

    h1 {
        margin: 0;
        margin-left: $margin;
        float: left;
        font-size: 1.8rem;
        line-height: $height;
    }

    .exit {
        margin-right: $margin;
        padding: 0 10px;
        float: right;
        cursor: pointer;

        &:hover { color: #00abe9; }

        &:before {
            font-family: 'icomoon';
            content: '\e039';
        }
    }
}
</style>