controller = {}
const { KineData } = require('../models');

controller.addKineData = async (req, res) => {
    try {
        const newData = new KineData(req.body);
        const added = await newData.save();
        return res.status(200).json(added);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getAllKineDatas = async (req, res) => {
    try {
        const data = await KineData.find();
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getKineDataByUserId = async (req, res) => {
    try {
        const data = await KineData.findOne({kine_fk:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteKineData = async (req, res) => {
    try {
        const data = await KineData.findByIdAndDelete(req.params.id);
        return res.status(200).json({deleted:data});
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;