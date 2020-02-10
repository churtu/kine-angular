controller = {}
const { Schedule } = require('../models');

controller.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(401).send(error)
    }
}

controller.addSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();
        return res.status(200).send('ok');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;