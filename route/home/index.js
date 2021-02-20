//引入Article模块
const { Article } = require('../../model/article');
//引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    const page = req.query.page;
    let result = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    result = JSON.stringify(result);
    result = JSON.parse(result);
    res.render('home/default', {
        result: result
    })
}