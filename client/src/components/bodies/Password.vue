<template>
    <div class="body body-password">
        <form>
            <div class="form-group">
                <label>旧密码: </label>
                <input type="password" class="form-control" v-model.lazy='oldPassword' placeholder='请输入旧密码'>
            </div>

            <div class="form-group">
                <label>新密码: </label>
                <input type="password" class="form-control" v-model.lazy='newPassword' placeholder='请输入新密码'>
            </div>

            <div class="form-group">
                <label>确认密码: </label>
                <input type="password" class="form-control" ref='repeat' v-model.lazy='repeatPassword' placeholder='请再次输入新密码'>
            </div>

            <div class="middle">
                <button class="btn btn-primary" @click.prevent='onClick'>确认修改</button>
            </div>
        </form>
    </div>
</template>

<script>
import 'whatwg-fetch'

export default {
    name: 'Password',
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        }
    },

    methods: {
        isConsistent() {
            if(this.newPassword !== this.repeatPassword)
                this.$refs.repeat.className = 'form-control input-danger'
            else
                this.$refs.repeat.className = 'form-control'
        },

        onClick() {
            if(this.newPassword !== this.repeatPassword) {
                alert('两次密码输入不一致')
            } else {
                const data = {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }

                fetch('/password', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(response => {
                    return response.json()
                }).then(({msg}) => {
                    alert(msg)
                })
            }
        }
    },

    watch: {
        newPassword() { this.isConsistent() },
        repeatPassword() { this.isConsistent() }
    }
}
</script>

<style lang='scss'>
.body-password {
    form {
        $labelWidth: 80px;
        $inputWidth: 200px;

        margin-top: 10px;
        padding-top: 20px;
        border-top: 3px solid #999;

        label {width: 80px;}
        input {
            display: inline-block;
            width: 200px;
        }

        .middle {
            position: relative;
            width: $labelWidth + $inputWidth;
            text-align: center;

            button {
                margin-right: -3px;
                float: right;
            }
        }
    }

    &:after {content: '修改密码';}
    .input-danger {
        border-color: #e96666;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233,120,120,.6);
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233,120,120,.6);
    }
}
</style>