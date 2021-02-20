//引入expres模块
const express = require('express');
//创建路由对象
const admin = express.Router();
//在admin路由下创建二级路由

//创建登录页面路由
//login页面
admin.get('/login', require('./admin/loginPage'));
//实现登录功能
admin.post('/login', require('./admin/login'));

//创建文章页面路由
admin.get('/article', require('./admin/article'));
//创建文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
//实现文章发布功能
admin.post('/article-add', require('./admin/article-add'));

//创建用户页面路由
admin.get('/user', require('./admin/userPage'));
//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

//实现退出功能
admin.get('/logout', require('./admin/logout'));
//实现新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));
//实现修改用户功能
admin.post('/user-modify', require('./admin/user-modify'));
//实现删除用户功能
admin.get('/user-delete', require('./admin/user-delete'));



//将admin以模块形式导出
module.exports = admin;