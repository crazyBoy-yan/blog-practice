//引入User模块
const { User } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');
//引入session模块
const session = require('express-session');

module.exports = async(req, res) => {
    //接收post请求参数
    const { email, password } = req.body;
    //如果用户没有输入邮件地址或者密码错误
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });
    //根据邮件地址查询用户信息
    //如果查询到了用户信息，user变量的值是对象类型，对象中储存的是用户信息
    //没查询到，user变量为空
    let user = await User.findOne({ email });
    //邮件地址匹配成功
    if (user) {
        //密码匹配成功
        //对比明文密码和加密密码
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            //对用户角色进行判断
            if (user.role == 'admin') {
                //重定向至用户列表页面
                res.redirect('/admin/user');
            } else {
                //重定向至至博客首页
                res.redirect('/home/');
            }
            //重定向至用户列表页面
            res.redirect('/admin/user');
        }
        //密码匹配失败
        else {
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
        }
    }
    //邮件地址匹配失败
    else {
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
}