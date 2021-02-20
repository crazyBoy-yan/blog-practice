//引入User模块
const { User } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    //接受客户端传递来的请求参数
    const { username, email, password, role, state } = req.body;
    //即将要修改的id
    const id = req.query.id;
    let user = await User.findOne({ _id: id });
    //密码比对
    let isValid = await bcrypt.compare(password, user.password);
    //密码比对成功
    if (isValid) {
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        res.redirect('/admin/user')
    }
    //密码比对失败
    else {
        let obj = { path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id };
        next(JSON.stringify(obj));
    }
}