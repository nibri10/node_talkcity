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
            require:false
        },
        dontlike_problem:{
            type:String,
            require:false
        }

});

module.exports = mongoose.model('Problem', ProblemSchema);

