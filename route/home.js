//引入express模块
const express = require('express');
//创建路由对象
const home = express.Router();
//在home路由下创建二级路由
//博客前台展示页面
home.get('/', require('./home/index'));
//博客前台文章详情页面
home.get('/article', require('./home/article'));
//博客前台文章评论页面
home.post('/comment', require('./home/comment'));
//将home以模块形式导出
module.exports = home;