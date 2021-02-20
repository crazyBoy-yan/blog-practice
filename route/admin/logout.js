module.exports = (req, res) => {
    //删除cookie
    res.clearCookie('connect.sid');
    res.render('admin/login');
    //删除用户信息
    req.app.locals.userInfo = null;
}