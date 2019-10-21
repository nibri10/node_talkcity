const mongoose = require('mongoose');

const ProblemSchema = mongoose.Schema({
        description:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default: Date.now
        },
        person:{
            type:String,
            require:true
        },
        like_problem:{
            type:String,
            require:false,
            default:'0'
        },
        dontlike_problem:{
            type:String,
            require:false,
            default:'0'
        }

});

module.exports = mongoose.model('Problem', ProblemSchema);

