const controller = {}
const {Type_evaluation} = require('../models');

controller.getAllTypeEvaluations = async (req, res) => {
    try {
        const data = await Type_evaluation.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getTypeEvaluation = async (req, res) => {
    try {
        const data = await Type_evaluation.findOne({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addTypeEvaluation = async (req, res) => {
    try {
        const newTypeEvaluation = new Type_evaluation(req.body);
        await newTypeEvaluation.save();
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteTypeEvaluation = async (req, res) => {
    try {
        await Type_evaluation.findByIdAndDelete(req.params.id);
        return res.status(200).send('Deleted');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;