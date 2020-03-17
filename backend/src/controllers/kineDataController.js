const { KineData } = require('../models');
const { ObjectId } = require('mongoose').Types;
controller = {}


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
        const data = await KineData.aggregate([
            {
                $lookup:{
                    from: 'specializations',
                    localField: 'specialization_fk',
                    foreignField: '_id',
                    as: 'specialization'
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'kine_fk',
                    foreignField: '_id',
                    as: 'kine'
                }
            }
        ]);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getKineDataByUserId = async (req, res) => {
    try {
        const data = await KineData.aggregate([
            {
                $match:{
                    kine_fk: ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from: 'specializations',
                    localField: 'specialization_fk',
                    foreignField: '_id',
                    as: 'specialization'
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'kine_fk',
                    foreignField: '_id',
                    as: 'kine'
                }
            }
        ]);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
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