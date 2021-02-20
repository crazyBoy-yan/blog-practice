//引入User模块
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //创建用户管理页面标识
    req.app.locals.currentLink = 'user';
    //接受客户端传递过来的当前页数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 10;
    //查询用户数据的总数
    let cont = await User.countDocuments({});
    //总页数
    let total = Math.ceil(cont / pagesize);
    //页码对应的数据开始查询位置
    let start = (page - 1) * pagesize;
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}