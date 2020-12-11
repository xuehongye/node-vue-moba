const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String
    },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    body: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', schema)