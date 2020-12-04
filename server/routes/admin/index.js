module.exports = app => {

    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')

    // AdminUser 模型
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true
    })

    // 封装token登录中间件  登录校验
    const authMiddleware = require('../../middleware/auth')

    // 获取模型中间件
    const resourceMiddleware = require('../../middleware/resource')

    // 创建资源
    router.post('/', async (req, res) => {
       const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 资源列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
       const models = await req.Model.find().setOptions(queryOptions)
        res.send(models)
    })
    // 资源详情
    router.get('/:id', async (req, res) => {
       const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 更新资源
    router.put('/:id', async (req, res) => {
       const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
       await req.Model.findByIdAndDelete(req.params.id)
       res.send({
           status: 0
       })
    })

    // 统一 CRUD 入口 第一个资源地址，第二个判断用户是否登录 （登录校验），第三个寻找对应的模型， 第四个挂载路由
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 图片上传
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户

        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')

        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 3.返回token  用 jsonwebtoken 做token验证
        // sign 两个参数， 1.用户唯一id   2.密钥
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({
            username: user.username,
            token
        })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}