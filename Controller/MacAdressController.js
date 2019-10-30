const MacAdress = require('../model/MacAdress');

exports.create =  (req,res) =>{
    if(!req.body.idproblem){
        return res.status(400).send({
            message: "Mac content can not be empty"
        });
    }
    const mac = new MacAdress({
        idproblem:req.body.idproblem,
        macAdress:req.body.macAdress,
        dontlike_problem :req.body.dontlike_problem,
        like_problem : req.body.like_problem


    });
    mac.save()
        .then(data=>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the Problem."
            });
    });
};


exports.findAll = (req, res) => {
    MacAdress.find()
        .then(macs => {
            res.send(macs);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving problems."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    MacAdress.findById(req.params.macId)
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macId
                });
            }
            res.send(mac);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macId
            });
        }
        return res.status(500).send({
            message: "Error retrieving problem with id " + req.params.macId
        });
    });
};



// Update a PROBLEM identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.dontlike_problem) {
        return res.status(400).send({
            message: "Mac description can not be empty"
        });
    }

    // Find Problem and update it with the request body
    MacAdress.findByIdAndUpdate(req.params.macId, {

        idproblem:req.body.idproblem,
        macAdress:req.body.macAdress,
        dontlike_problem :req.body.dontlike_problem,
        like_problem : req.body.like_problem
    }, {new: true})
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macId
                });
            }
            res.send(problem);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macId
            });
        }
        return res.status(500).send({
            message: "Error updating problem with id " + req.params.macId
        });
    });
};

// Delete a note with the specified macId in the request
exports.delete = (req, res) => {
    MacAdress.findByIdAndRemove(req.params.macId)
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macId
                });
            }
            res.send({message: "Problem deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macId
            });
        }
        return res.status(500).send({
            message: "Problem not delete note with id " + req.params.macId
        });
    });
};

