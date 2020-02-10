controller = {}
const { PatientData } = require('../models');

controller.addPatientData = async (req, res) => {
    try {
        const newPatient = new PatientData(req.body);
        await newPatient.save();
        return res.status(200).send('patient saved');
    } catch (error) {
        return console.log(error)
    }
}

controller.getPatientsData = async (req, res) => {
    try {
        const patients = await PatientData.find();
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
        const patient = await PatientData.findOne({_id:req.params.id});
        console.log(patient)
        if(patient){
            await Patient.findByIdAndDelete(patient._id);
            return res.status(200).send('ok');
        }
        return res.status(401).send('not found');
    } catch (error) {
        return res.status(402);
    }
}



module.exports=controller;