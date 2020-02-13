const controller = {}
const { Specialization } = require('../models');

controller.getAllSpecializations = async (req, res) => {
    try {
        const specializations = await Specialization.find();
        return res.status(200).json(specializations);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getSpecialization = async (req, res) => {
    try {
        const specialization = await Specialization.findOne({_id:req.params.id});
        return res.status(200).json(specialization);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteSpecialization = async (req, res) => {
    try {
        await Specialization.findByIdAndDelete(req.params.id);
        return res.status(200).send('Deleted');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addSpecialization = async (req, res) => {
    try {
        const newSpecialization = new Specialization(req.body);
        await newSpecialization.save();
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;