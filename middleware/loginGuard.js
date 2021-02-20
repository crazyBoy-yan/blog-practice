const guard = (req, res, next) => {
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        //如果用户是登录状态，并且是普通用户
        if (req.session.role == "normal") {
            //重定向至至博客首页
            return res.redirect('/home/');
        }
        //如果用户是登录状态，将请求方行
        next()
    }
}
module.exports = guard