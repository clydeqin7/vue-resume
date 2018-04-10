Vue.component('login', {
    data(){
        return {
            signInVisible: true,
            signUpVisible: false,   
            signIn: {
                email: '',
                password: '',
            },
            signUp: {
                email: '',
                password: '',
            },  
 
        }
    },
    methods: {
        checkXXX(str){
            let trimedStr = str.trim()
            if(trimedStr === '' || trimedStr === null || trimedStr === undefined){
                return false
            }else{
                return true
            }
        },
        onSignIn(){
            if(this.checkXXX(this.signIn.email) || this.checkXXX(this.signIn.password)){
                AV.User.logIn(this.signIn.email, this.signIn.password).then((loginedUser) => {
                    this.$emit('logined', loginedUser.toJSON() )
                }, function (error) {
                    if(error.code === 210){
                        alert('邮箱和密码不匹配')
                    }else if(erro.code === 211){
                        alert('该邮箱未注册')
                    }else{
                        alert('出现未知错误，请稍后再试')
                    }
                })           
            }else{
                alert('请填写完整内容')
                return
            }
        },
        onSignUp(){
            if(this.checkXXX(this.signIn.email) || this.checkXXX(this.signIn.password)){
                const user = new AV.User()
                user.setUsername(this.signUp.email)
                user.setPassword(this.signUp.password)
                user.setEmail(this.signUp.email)
                user.signUp().then((user) => {
                    //TODO: 修改这个代码
                    AV.User.logOut()
                    alert('注册成功，将前往登录界面')
                    this.signUpVisible = false
                    this.signInVisible = true
                }, (error) => {
                    if(error.code === 203){
                        alert('此邮箱已经注册')
                    }
                })            
            } else {
                alert('请填写完整内容')
                return
            }
        },

                             
    },
    template: `
        <div class="login"  v-cloak>
            <div class="form">
                <div class="formNav">
                    <span class="sin" :class="{ active: signInVisible}" @click="signUpVisible = false; signInVisible = true" >登录</span>
                    <span class="sup" :class="{ active: signUpVisible}"@click="signUpVisible = true; signInVisible = false" >注册</span>
                </div>
                <form class="sinForm"  v-show="signInVisible" @submit.prevent="onSignIn">
                    <div class="row">
                        <label>邮箱</label>
                        <input type="text" v-model="signIn.email">
                    </div>
                    <div class="row">
                        <label>密码</label>
                        <input type="password" v-model="signIn.password">
                    </div>
                    <button type="submit">提交</button>
                    <button @click="$emit('closelogin')" type="button">关闭</button>
                </form>
                <form class="supForm"  v-show="signUpVisible" @submit.prevent="onSignUp">
                    <div class="row">
                        <label>邮箱</label>
                        <input type="text" v-model="signUp.email">
                    </div>
                    <div class="row">
                        <label>密码</label>
                        <input type="password" v-model="signUp.password">
                    </div>
                    <button type="submit">提交</button>
                    <button @click="$emit('closelogin')" type="button">关闭</button>
                </form>                
            </div>      
        </div>    
    `,
})