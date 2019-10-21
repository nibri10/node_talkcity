const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
        number:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        uniqueId:{
            type:String,
            require:true
        }
     

});

module.exports = mongoose.model('User', UserSchema);
