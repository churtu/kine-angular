const controller = {}
const { Evaluation } = require('../models');

controller.getAllEvaluations = async (req, res) => {
    try {
        const data = await Evaluation.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getEvaluation = async (req, res) => {
    try {
        const data = await Evaluation.findOne({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addEvaluation = async (req, res) => {
    try {
        console.log(req.body);
        const newEvaluation = new Evaluation(req.body);
        const added = await newEvaluation.save();
        console.log(added);
        return res.status(200).json(added);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteEvaluation = async (req, res) => {
    try {
        await Evaluation.findByIdAndDelete(req.params.id);
        return res.status(200);
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;