controller = {}
const { Patient_Data, Agenda } = require('../models');
const {ObjectId} = require('mongoose').Types;

controller.addPatientData = async (req, res) => {
    try {
        const newPatient = new Patient_Data(req.body);
        const saved = await newPatient.save();
        return res.status(200).json(saved);
    } catch (error) {
        return console.log(error)
    }
}

controller.getPatientsData = async (req, res) => {
    try {
        const patients = await Patient_Data.find();
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(402)
    }
}

controller.getPatientData = async (req, res) => {
    res.send('one patient')
}

controller.deletePatientData = async (req, res) => {
    try {
        const patient = await Patient_Data.findOne({_id:req.params.id});
        console.log(patient)
        if(patient){
            await Patient_Data.findByIdAndDelete(patient._id);
            return res.status(200).send('ok');
        }
        return res.status(401).send('not found');
    } catch (error) {
        return res.status(402);
    }
}

controller.getPatientDataByUserId = async (req, res) => {
    try {
        const data = await Patient_Data.findOne({patient_fk: req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getDiagnosticByPatientId = async (req, res) => {
    try {
        const data = await Patient_Data.aggregate([
            {
                $match:{
                    patient_fk:ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from:'treatments',
                    localField:'_id',
                    foreignField:'patient_data_fk',
                    as:'treatment'
                }
            }
        ])
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(401).send(error);
    }
}

controller.getPatientsByKineId = async (req, res) => {
    try {
        const data = await Agenda.distinct("patient_fk",{kine_fk:ObjectId(req.params.id)});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports=controller;