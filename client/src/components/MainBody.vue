<template>
    <div id='main'>
        <keep-alive>
            <component :is='key'/>
        </keep-alive>
    </div>
</template>

<script>
import OutCard from './bodies/OutCard'
import Users from './bodies/Users'
import Permission from './bodies/Permission'
import Node from './bodies/Node'
import Record from './bodies/Record'
import EntranceGuardState from './bodies/EntranceGuardState'
import Password from './bodies/Password'

export default {
    data() { return {key: ''} },

    methods: {
        toggle(key) { this.key = key }
    },

    components: {
        OutCard,
        Users,
        Permission,
        Node,
        Record,
        EntranceGuardState,
        Password
    },

    mounted() { this.$on('toggle', key => this.toggle(key)) }
}
</script>

<style lang='scss'>
#main {
    position: absolute;
    top: 32px;      // title的height
    bottom: 0;
    left: 160px;    // sidebar的width
    right: 0;
    overflow: scroll;

    .body {
        padding: 50px 15px 0 15px;

        &:after {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #666;
            font-size: 1.5em;
        }

        table>thead>tr>td {
            font-weight: bold;
            font-size: 1.2em;
        }

        table>tbody>tr>td {line-height: 35px;}
    }

    .search:before {
        display: inline-block;
        margin-right: 5px;
        font-family: 'icomoon';
        content: '\e036';
    }
}
</style>