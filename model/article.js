//引入mongoose模块 
const mongoose = require('mongoose');
//引入mongolass模块 
//const mongolass = require('mongolass');
//创建用户集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
//创建用户集合
const Article = mongoose.model('Article', articleSchema);
//导出用户
module.exports = {
    Article
}