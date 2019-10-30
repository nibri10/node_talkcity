const mongoose = require('mongoose');

const MacSchema = mongoose.Schema({
    idproblem:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Problem"
    },

    macAdress:{
       type: mongoose.Schema.Types.ObjectId, 
       ref: "User"

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
