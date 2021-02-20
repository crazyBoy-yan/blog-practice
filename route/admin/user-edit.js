//引入User模块
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //创建用户管理页面标识
    req.app.locals.currentLink = 'user';
    const { message, id } = req.query;
    //如果id为真，则页面跳至修改页面
    if (id) {
        let user = await User.findOne({ _id: id })
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    }
    //如果id为假，则页面跳至添加页面 
    else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }


}