//引入User模块
const { User, validateUser } = require('../../model/user');
module.exports = async(req, res) => {
    //获取要删除的id
    await User.findOneAndDelete({ _id: req.query.id })
    res.redirect('/admin/user')
}