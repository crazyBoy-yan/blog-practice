//引入expres模块
const express = require('express');
//创建服务器
const app = express();
//引入path模块
const path = require('path');
//引入body-parser模块
const bodyParser = require('body-parser');
//引入session模块
const session = require('express-session');
//引入dateformat模块
const dateFormat = require('dateformat');
//引入art-template模块
const template = require('art-template');
//引入morgan模块
const morgan = require('morgan');
//引入config模块
const config = require('config');
//引入数据库连接模块
require('./model/connect');
//引入用户·模块
require('./model/user');
//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//判断当前是开发环境还是生产环境
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    //app.use(morgan('dev'))
} else {
    console.log('当前是生产环境');
}

//配置session模块
app.use(session({
    //添加 resave 选项
    resave: false,
    //添加 saveUninitialized 选项
    saveUninitialized: true,
    secret: 'secret key'
}));

//配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));
//设置模板存放根目录
app.set('views', path.join(__dirname, 'views'));
//渲染模板的时候不写后缀,默认拼接art后缀
app.set('view engine', 'art');
//当渲染后缀为art的模板时，使用express-art-template引擎
app.engine('art', require('express-art-template'));
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//引入路由对象
const home = require('./route/home');
const admin = require('./route/admin');
//设置登录拦截
app.use('/admin', require('./middleware/loginGuard'));
//创建一级路由
app.use('/home', home);
app.use('/admin', admin);
//配置请求拦截
app.use((err, req, res, next) => {
        //使用JSON.parse方法将字符串对象转换为对象类型
        const result = JSON.parse(err);
        // { path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id }
        let params = []
        for (let attr in result) {
            if (attr != path) {
                params.push(attr + '=' + result[attr]);
            }
        }
        res.redirect(`${result.path}?${ params.join('&')}`)
    })
    //监听80端口
app.listen(80);
console.log('服务器启动成功，请访问localhost');