const mongoose = require('mongoose');

const MacSchema = mongoose.Schema({
    idproblem:{
        type:String,
        require:true
    },

    macAdress:{
        type:String,
        require:true

    },
    like_problem:{
        type:String,
        require:true

    },
    dontlike_problem:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Mac', MacSchema);