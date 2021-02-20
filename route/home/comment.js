//引入Comment模块
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    const { content, aid, uid } = req.body
    await Comment.create({
        content: content,
        aid: aid,
        uid: uid,
        time: new Date()
    });
    //将页面重定向至用户页面
    res.redirect('/home/article?id=' + aid);
}