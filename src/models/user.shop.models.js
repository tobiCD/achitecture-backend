const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String], // Chuyển thành mảng chuỗi nếu bạn muốn lưu nhiều vai trò
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true // Sửa lỗi chính tả
});
const User = model(DOCUMENT_NAME, userSchema);



module.exports = User;
