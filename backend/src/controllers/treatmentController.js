const controller = {}
const { Treatment } = require('../models')

controller.getAllTreatments = async (req, res) => {
    try {
        const data = await Treatment.find();
        return res.status(402).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getTreatment = async (req, res) => {
    try {
        const data = await Treatment.findOne({_id: req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addTreatment = async (req, res) => {
    try {
        const newTreatment = new Treatment(req.body);
        await newTreatment.save();
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteTreatment = async (req, res) => {
    try {
        await Treatment.findByIdAndDelete(req.params.id);
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;