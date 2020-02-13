const controller = {}
const { KineData } = require('../models');

controller.getAllKineData = async (req, res) => {
    try {
        const data = await KineData.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getKineData = async (req, res) => {
    try {
        const data = await KineData.findOne({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addKineData = async (req, res) => {
    try {
        const newData = new KineData(req.body);
        await newData.save();
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteKineData = async (req, res) => {
    try {
        await KineData.findByIdAndDelete(req.params.id);
        return res.status(200).send('Delete');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;