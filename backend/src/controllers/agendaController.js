const controller = {}
const { Agenda } = require('../models');
const { ObjectId } = require('mongoose').Types;
const moment = require('moment');

controller.getAllAgendas = async (req, res) => {
    try {
        const data = await Agenda.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getAgenda = async (req, res) => {
    try {
        const data = await Agenda.findOne({ _id: req.params.id });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteAgenda = async (req, res) => {
    try {
        await Agenda.findByIdAndDelete(req.params.id);
        return res.status(200).send('Deleted');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addAgenda = async (req, res) => {
    try {
        const newAgenda = new Agenda(req.body);
        const added = await newAgenda.save();
        return res.status(200).json(added);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getAgendaDataByKineId = async (req, res) => {
    try {
        const data = await Agenda.aggregate([
            {
                $match:{
                    kine_fk: ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'kine_fk',
                    foreignField:'_id',
                    as:'kine'
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'patient_fk',
                    foreignField:'_id',
                    as:'patient'
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        return res.status(402).send(error);
    }
}

controller.getAgendaDataByKineIdAndDate = async (req, res) => {
    try {
        console.log(moment(req.params.date).format('YYYY-MM-DD'))
        const today = moment(req.params.date).format('YYYY-MM-DD');
        const data = await Agenda.aggregate([
            {
                $match:{
                    kine_fk: ObjectId(req.params.id),
                    date:{$gte: new Date(today+"T00:00:00Z"), $lt: new Date(today+"T23:59:59Z")}
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'kine_fk',
                    foreignField:'_id',
                    as:'kine'
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'patient_fk',
                    foreignField:'_id',
                    as:'patient'
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(402).send(error);
    }
}

controller.putAgenda = async (req, res) => {
    try {
        const data = await Agenda.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}


module.exports = controller;