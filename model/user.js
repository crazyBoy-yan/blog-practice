//引入mongoose模块 
const mongoose = require('mongoose');
//引入bcrypt模块
const bcrypt = require('bcrypt');
//引入Joi模块
const Joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        //后期修改为true
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    //启用状态： 0:启用 1:禁用
    state: {
        type: Number,
        default: 0
    }
});
//创建用户集合
const User = mongoose.model('User', userSchema);
//创建用户
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    await User.create({
        username: 'iteheima',
        email: 'iteheima@itcast.cn',
        password: pass,
        role: 'admin',
        //启用状态： 0:启用 1:禁用
        state: 0
    })
}
//createUser();

//请求参数验证
const validateUser = user => {
        //定义对象规则
        const schema = {
                username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合要求')),
                email: Joi.string().email().required().error(new Error('邮箱地址不符合要求')),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
                role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
                state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
            }
            //验证对象
        return Joi.validate(user, schema);
    }
    //导出用户
module.exports = {
    User,
    validateUser
}