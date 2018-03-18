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

## TODO

- 页面最开始进入时的当前用户判断，`AV.User.curret()`默认是存储在Localstorage, 注册后`AV.User.current()` 也是就立即拥有了的