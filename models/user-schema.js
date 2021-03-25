const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    psw:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tel:{
        type: Number,
    },
    date:{
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false
    },
    ads: [{type: mongoose.Types.ObjectId, ref: 'Ads'}],
    favorite: [{type: mongoose.Types.ObjectId, ref: 'Ads'}],
    hide: [{type: mongoose.Types.ObjectId, ref: 'Ads'}],
    notes: [{ad:{type: mongoose.Types.ObjectId, ref: 'Ads'},note:{type: String}}]
})

const User = mongoose.model('User', userSchema)
module.exports = User