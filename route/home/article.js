//引入Article模块
const { Article } = require('../../model/article');
//引入Comment模块
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //接受客户端传来的文章信息
    const id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    let comment = await Comment.find({ aid: id }).populate('uid').lean();
    res.render('home/article', { article, comment })
}