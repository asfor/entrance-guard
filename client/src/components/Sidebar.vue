<template>
    <nav v-once class='sidebar-warp'>
        <ul id="sidebar">
            <li
                v-for='(item, index) in items'
                :key='index'
                ref='items'
                @click='onClick(item.component, index)'
            >
                <i :class='item.iconClass'></i>
                <span>{{item.title}}</span>
            </li>
        </ul>
    </nav>
</template>

<script>
import {sidebarItems} from '../config'

export default {
    name: 'sidebar',

    data() {
        return {
            activeIndex: 0,
            items: sidebarItems
        }
    },

    methods: {
        onClick(key, index) { this.$emit('toggle', key, index) },
        toggleActive(index) {
            this.$refs.items[this.activeIndex].className = ''
            this.$refs.items[index].className = 'active'
            this.activeIndex = index
        }
    },

    mounted() { this.$on('toggleActive', this.toggleActive) }
}
</script>

<style lang='scss'>
.sidebar-warp {
    width: 160px;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #23282d;
    z-index: 0;
}

#sidebar {
    margin-top: 32px; //title的height
    padding-top: 12px;
    list-style: none;
    color: #fff;

    li {
        $minH: 34px;

        min-height: $minH;
        cursor: pointer;

        &:hover {
            $hoverColor: #00abe9;

            color: $hoverColor;
            background-color: #191e23;

            i { color: $hoverColor; }
        }

        i {
            float: left;
            display: inline-block;
            width: 36px;
            height: $minH;
            font-family: 'icomoon';
            font-style: normal;
            color: #a0a5aa;
            text-align: center;

            &:before {
                $sideLen: 20px;

                display: inline-block;
                padding: 7px 0;
                height: $sideLen;
                width: $sideLen;
                font-size: $sideLen;
                line-height: 1;
                vertical-align: top;
            }
        }

        span {
            position: relative;
            display: block;
            padding: 8px 0;
            user-select: none;
        }
    }

    .active {
        $bgColor: #0073aa;
        $fontColor: #fff;
        
        background-color: $bgColor;

        &:hover {
            color: $fontColor;
            background-color: $bgColor;

            i { color: $fontColor; }
        }

        i:before{ color: $fontColor; }
        span:after {
            $harf: 8px;

            content: '';
            height: 0;
            width: 0;
            position: absolute;
            top: 50%;
            right: 0;
            border: $harf solid transparent;
            border-right-color: #f1f1f1;
            margin-top: -$harf;
        }
    }
}

.unlock:before {content: '\e008'}
.signal:before {content: '\e011'}
.cog:before {content: '\e023'}
.paper:before {content: '\e034'}
.head:before {content: '\e074'}
.tag:before {content: '\e085'}
.grid:before {content: '\e102'}
</style>
