 //引入Article模块
 const { Article } = require('../../model/article');
 //引入mongoose-sex-page模块
 const pagination = require('mongoose-sex-page');

 module.exports = async(req, res) => {
     //创建文章管理页面标识
     const page = req.query.page;
     req.app.locals.currentLink = 'article';
     // 解决方案1：
     // 使用lean()
     // let result = await Article.find({}).populate('author').lean();

     // 解决方案2：
     // 如果使用了第三方模块mongoose-sex-page控制查询数据，则不能使用lean()。
     // 导入第三方模块mongoose-sex-page控制分页查询的数据
     //const pagination = require('mongoose-sex-page');
     //let result = await pagination(Article).page(1).size(4).display(5).find({}).populate('author').exec();
     // result = JSON.stringify(result);
     // result = JSON.parse(result);

     let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
     articles = JSON.stringify(articles);
     articles = JSON.parse(articles);

     res.render('admin/article', {
         articles: articles
     });
     //res.send(articles);

 }