var app = new Vue({
    el: '#app',
    data:{
        editingName: false,
        signInVisible: true,
        signUpVisible: false,
        loginVisible: false,
        currentUser: {
        id: undefined,
        email: '',
        },        
        resume:{
            name: '姓名1',
            gender: '男',
            birthday: '1990.01',
            phone: '13800138001',
            email: 'email@example.com',
            jobTitle: '前端工程师',
        },
        signIn: {
            email: '',
            password: '',
        },
        signUp: {
            email: '',
            password: '',
        }
    },
    methods:{
        onEdit(key, value){
            this.resume[key] = value
        },
        onSaveClick(){
            // TODO: 页面加载时是否判断用户登录了的
            let currentUser = AV.User.current()
            if (currentUser) {
                this.currentUser.id = currentUser.id
                this.saveResume()
            }
            else {
                this.showLogin()
            }
        },
        saveResume(){
            // 第一个参数是 className，第二个参数是 objectId
            var user = AV.Object.createWithoutData('User', this.currentUser.id);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(e=>{
                alert('保存简历成功')
            });
        },
        showLogin(){
            this.loginVisible = true
        },
        onLogout(){
            AV.User.logOut()
            this.currentUser.id = null
        },
        onSignIn(){
            AV.User.logIn(this.signIn.email, this.signIn.password).then((loginedUser) => {
                this.currentUser.id = loginedUser.id
                this.currentUser.email = loginedUser.attributes.email
                this.loginVisible = false
            }, function (error) {
                if(error.code === 210){
                    alert('邮箱和密码不匹配')
                }else if(erro.code === 211){
                    alert('该邮箱未注册')
                }
            })           
        },
        onSignUp(){
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
        }
    }
})

