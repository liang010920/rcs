# vx

> vx

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

----start
登录后主界面色彩：
head修改在variables.less中修改@headFont和@headBackground

sidebar菜单修改：
@subMenuBg:#be8e49;//子菜单的背景颜色
@menuHover:#9c5f22;//子菜单鼠标划中后的颜色
还有layout\components\Sidebar\index.vue种
background-color 菜单的背景色
text-color 菜单的文字颜色
active-text-color 当前激活菜单的文字颜色

sidebar.less文件内修改head与sidebar菜单连接处的边线颜色
.sidebar-container内的border-top
----end
