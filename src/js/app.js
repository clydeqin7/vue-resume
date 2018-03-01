var app = new Vue({
    el: '#app',
    data:{
        editingName: false,
        resume:{
            name: '姓名1',
            gender: '男',
            birthday: '1990.01',
            phone: '13800138001',
            email: 'email@example.com',
            jobTitle: '前端工程师',
        }
    },
    methods:{
        onEdit(key, value){
            this.resume[key] = value
        }
    }
})

