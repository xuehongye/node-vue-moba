const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 英雄名称
    name: {
        type: String
    },
    // 英雄头像
    avatar: {
        type: String
    },
    // 英雄代号
    title: {
        type: String
    },
    // 英雄分类
    categories: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
    }],
    // 难易指数 伤害指数 攻击指数 生存指数
    scores:{
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    // 技能描述
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    // 顺风出装
    items1: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }],
    // 逆风出装
    items2: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }],
    // 使用技巧
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 英雄关系 最佳搭档
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)