const mongoose = require('mongoose');

/* define UsersChema */
const UserScheme = new mongoose.Schema({

    email: String,
    password: String,
    firstName: String,
    lastName: String,
    createAt: {
        type: Date,
        default: new Date(),
    },
    permissions: {
        type:Array,
        default:['NOTE.CREATE','NOTE.UPDATE','NOTE.DELETE'],
    },

})

/* create Model */
const UserModel = mongoose.model('User',UserScheme);

module.exports = UserModel;