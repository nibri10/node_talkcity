const Problem = require('../model/Problem');

exports.create =  (req,res) =>{
    if(!req.body.description){
        return res.status(400).send({
            message: "Problem content can not be empty"
        });
    }
    const problem = new Problem({
    description :req.body.description,
    city : req.body.city,
    date : req.body.date,
    person : req.body.person,
    dontlike_problem :req.body.dontlike_problem,
    like_problem : req.body.like_problem


    });
    problem.save()
        .then(data=>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the Problem."
            });
    });
};


exports.findAll = (req, res) => {
    Problem.find()
        .then(problems => {
            res.send(problems);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving problems."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Problem.findById(req.params.problemId)
        .then(problem => {
            if(!problem) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.problemId
                });
            }
            res.send(problem);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.problemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving problem with id " + req.params.problemId
        });
    });
};

exports.findCity = (req,res) =>{
    const urlParameter = req.params.cityUser;

    Problem.find({'city':urlParameter},(err,problem)=>{
        if(err){
            return handle(err);
        }
        else
            res.send(problem);
    })
};

// Update a PROBLEM identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.dontlike_problem) {
        return res.status(400).send({
            message: "Problem description can not be empty"
        });
    }

    // Find Problem and update it with the request body
    Problem.findByIdAndUpdate(req.params.problemId, {
   
        dontlike_problem :req.body.dontlike_problem,
        like_problem : req.body.like_problem
    }, {new: true})
        .then(problem => {
            if(!problem) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.problemId
                });
            }
            res.send(problem);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.problemId
            });
        }
        return res.status(500).send({
            message: "Error updating problem with id " + req.params.problemId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Problem.findByIdAndRemove(req.params.problemId)
        .then(problem => {
            if(!problem) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.problemId
                });
            }
            res.send({message: "Problem deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.problemId
            });
        }
        return res.status(500).send({
            message: "Problem not delete note with id " + req.params.problemId
        });
    });
};

