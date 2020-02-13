const controller = {}
const { Session } = require('../models');

controller.getAllSessions = async (req, res) => {
    try {
        const data = await Session.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.getSession = async (req, res) => {
    try {
        const data = await Session.findOne({_id: req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.addSession = async (req, res) => {
    try {
        const newSession = new Session(req.body);
        newSession.save();
        return res.status(200).send('OK');
    } catch (error) {
        return res.status(401).send(error);
    }
}

controller.deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        return res.status(200).send('Deleted');
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;