const express = require('express')

const app = express()

app.set('secret', 'xuehongyanqinxiaomen')

// 解决跨域问题
app.use(require('cors')())
// 后台识别客户端返回的json数据
app.use(express.json())

// 静态托管资源
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

 app.listen(3000, () => {
    console.log('http://localhost:3000')
})