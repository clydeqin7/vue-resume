var app = new Vue({
    el: '#app',
    data:{
        editingName: false,
        signInVisible: true,
        signUpVisible: false,
        loginVisible: false,
        shareVisible: false,
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
            skills: [
                {name:'技能名称', description: '技能具体描述'},
                {name:'技能名称', description: '技能具体描述'},            
                {name:'技能名称', description: '技能具体描述'},
                {name:'技能名称', description: '技能具体描述'},
            ],
            projects: [
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
            ]
        },
        signIn: {
            email: '',
            password: '',
        },
        signUp: {
            email: '',
            password: '',
        },
        shareLink: '',
    },
    watch: {
       'currentUser.id' : function(val, oldVal){
           this.getResume(val)
       },
    },
    methods:{
        removeProject(index){
            this.resume.projects.splice(index, 1)
        },
        addProject(){
            this.resume.projects.push(
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
            )            
        },
        addSkill(){
            this.resume.skills.push({name:'技能名称', description: '技能具体描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index, 1)
        },
        onEdit(key, value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number) => `.${number}`)
            // key = skills.0.name
            keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }            
        },
        onSaveClick(){
            // TODO: 页面最开始加载时是否判断用户登录了的
            let currentUser = AV.User.current()
            if (currentUser) {
                this.currentUser.id = currentUser.id
                this.saveResume()
            }
            else {
                this.showLogin()
            }
        },
        getResume(objectId){
            var query = new AV.Query('User');
            query.get(objectId).then( (user) =>{
                Object.assign(this.resume, user.attributes.resume)
            }, function (error) {
                // 异常处理
            });            
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
            this.currentUser.id = undefined
            alert('注销成功')
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

let currentUser = AV.User.current()
if (currentUser) {
    console.log(currentUser)
    app.currentUser.id = currentUser.id
    app.shareLink = location.origin + location.pathname + '?user_id=' + currentUser.id
    app.getResume(app.currentUser.id)
}

