# Vue简历制作工具

## l2

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

## l3

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
		this.getResume(val)
	},
}
```



## TODO

- [D]页面最开始进入时的当前用户判断，`AV.User.curret()`默认是存储在Localstorage, 注册后`AV.User.current()` 也是就立即拥有了的

   ```
  在app外判断当前用户
  var app = new Vue({...})
  let currentUser = AV.User.current()
  if (currentUser) {
      app.currentUser.id = currentUser.id
      app.getResume(app.currentUser.id)
  }
   ```

  ​

