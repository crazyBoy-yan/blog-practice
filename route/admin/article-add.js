 //引入formidable模块
 const formidable = require('formidable');
 //引入Article模块
 const { Article } = require('../../model/article');
 //引入path模块
 const path = require('path');
 module.exports = (req, res) => {
     //1.创建表单解析对象
     const form = new formidable.IncomingForm();
     //2.配置上传文件的存放位置
     form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
     //3.保留上传文件的后缀
     form.keepExtensions = true;
     //4.解析表单
     form.parse(req, async(err, fields, files) => {
         //1.err 错误对象，解析失败为错误信息，解析成功为null
         //2. fields 对象类型 保存普通表单数据
         //3.files  对象类型 保存了和上传文件相关的数据
         await Article.create({
             title: fields.title,
             author: fields.author,
             publishDate: fields.publishDate,
             cover: files.cover.path.split('public')[1],
             content: fields.content
         })
     })
     res.redirect('/admin/article')
         //res.send('ok')
 }