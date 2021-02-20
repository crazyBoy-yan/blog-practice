//引入User模块
const { User, validateUser } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    try {
        await validateUser(req.body);
    } catch (error) {
        //return res.redirect(`/admin/user-edit?message=${error.message}`);
        //使用JSON.stringify方法将对象类型转换为字符串对象
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
    }
    //查询用户信息，判断邮箱地址是否已注册
    let user = await User.findOne({ email: req.body.email });
    //当user为对象时，说明邮箱地址已经注册过了
    if (user) {
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }
    //给密码加密
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = pass;
    //将用户添加到数据库
    await User.create(req.body);
    //将页面重定向至用户页面
    res.redirect(`/admin/user`);
}