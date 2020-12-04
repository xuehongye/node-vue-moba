const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: { type: String },
    password: { 
        type: String,
        select: false,  // 隐藏密码
        set(val) {
            // bcrypt 用于密码散列 10 - 12 位比较合理
            return require('bcrypt').hashSync(val, 12)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)