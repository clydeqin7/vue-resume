# Vue简历制作工具

## L2

### 登录、注册、登出功能

- 通过邮箱注册用户，将信息保存到leancloud

### v-cloak的使用

```css
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak> 
</div>
```

不会显示，直到编译结束。

## L3

### 获取当前是列表中哪个li正在编辑

```javascript
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
}
```

### watch的使用

```
watch: {
	'currentUser.id' : function(val, oldVal){
		if(val){
		 this.getResume(val)          
		}
	},
}
```

### 获取分享链接

```
app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
```

### 计算属性computed

项目中根据计算属性的值决定显示的内容

```javascript
computed: {
displayResume () {
		return this.mode === 'edit' ? this.resume : this.previewResume
	}
}
```

```css
<editable-span :value="displayResume.name" @edit="onEdit('name', $event)"></editable-span>
```



## L4

### 打印功能实现

```javascript
window.print()
```

css的媒体查询

```css
<link rel="stylesheet" href="xxx.css" media="print"/> 
```

### Vue class控制active

```javascript
<span class="sin" :class="{ active: signInVisible}" @click="signUpVisible = false; signInVisible = true" >登录</span>
```

### 组件化应用

**组件的data必须是函数**

父组件通过prop向子组件传递数据，子组件通过emit向父组件发送消息

## TODO

[D]页面最开始进入时的当前用户判断，`AV.User.curret()`默认是存储在Localstorage, 注册后`AV.User.current()` 也是就立即拥有了的

```
  在app外判断当前用户
  var app = new Vue({...})
  let currentUser = AV.User.current()
  if (currentUser) {
   app.currentUser.id = currentUser.id
   app.getResume(app.currentUser.id)
  }
```
- 开始没登录，后来登录了怎么获取shareLink

- 监控变化显示简历的优化,现在`watch` 里变化的是直接添加到 resume 而没管 previewResume

- ~~退出预览再次进入预览~~[D]、预览连接退出预览后编辑再进入预览的显示内容

- 分享框的复制按钮将链接复制到粘贴板，但不是复制`textarea`里的链接内容

  ​