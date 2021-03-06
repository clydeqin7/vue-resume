var app = new Vue({
    el: '#app',
    data:{
        editingName: false,
        hasPreviewUser: false,
        loginVisible: false,
        shareVisible: false,
        currentUser: {
            objectId: '',
            email: '',
        }, 
        previewResume: {},       
        resume:{
            name: '姓名',
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

        shareLink: '',
        mode: 'edit' // 'preview'
    },
    computed: {
        displayResume () {
            return this.mode === 'edit' ? this.resume : this.previewResume
        }
    },
    watch: {
       'currentUser.objectId' : function(val, oldVal){
        if(val){
            // TODO:监控变化显示简历的优化
            this.getResume(this.currentUser).then(resume => {
            if(resume === '-1'){

            }else{
                  this.resume = resume
            }
            })
            app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        }
       },
    },
    methods:{
        xxxxx(){
            console.log('1')
        },
        copyLink(){
            //TODO: 实现按钮复制链接功能
            console.log(1)
        },
        loginedUser: function(data){
            alert('登录成功')
            this.currentUser.objectId = data.objectId
            this.currentUser.email = data.email
            this.loginVisible = false            
        },
        // TODO:预览界面退出编辑后想看编辑的效果
        onPreviewClick(){
            if(this.hasPreviewUser){

            }else{
             this.previewResume = this.resume
            }
           this.mode = "preview"
        },
        print(){
            window.print()
        },
        exitPreview () {
            this.mode = 'edit'
        },
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
                this.currentUser.objectId = currentUser.id
                this.saveResume()
            }else {
                this.showLogin()
            }
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then(user => {
                let resume = user.toJSON().resume ? user.toJSON().resume : '-1'
                return resume
            })
        },
        saveResume(){
            // 第一个参数是 className，第二个参数是 objectId
            var user = AV.Object.createWithoutData('User', this.currentUser.objectId);
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
            this.currentUser.objectId = undefined
            alert('注销成功')
        }, 
    }
})

let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    // TODO: 开始没登录，后来登录了怎么获取shareLink
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then(resume => {
        if(resume === '-1'){

        }else{
            app.resume = resume
        }             
    })
}

// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]
  app.hasPreviewUser = true
  app.mode = 'preview'
  app.getResume({objectId: userId}).then(resume => {
        if(resume === '-1'){

        }else{
            app.previewResume = resume
    }         
  })
}
