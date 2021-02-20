module.exports = (req, res) => {
    //创建文章管理页面标识
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit')
}