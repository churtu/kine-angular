const { TypeUser } = require('../models');
controller = {}

controller.getAllTypeUsers = async (req, res) => {
    try {
        const types = await TypeUser.find();
        res.status(200).json(types);
    } catch {
        res.status(402).send('no rows');
    }
}

controller.getTypeUserById = async (req, res) => {
    try {
        const type = await TypeUser.findById(req.params.id);
        if (type) {
            res.status(200).json(type);
        }
    } catch (error) {
        res.status(402).send(error);
    }
}

controller.addTypeUser = async (req, res) => {
    try {
        const { description } = req.body;
        const newType = new TypeUser({ description });
        await newType.save();
        return res.status(200);
    } catch (error) {
        return res.status(402).send(error);
    }

}

controller.deleteTypeUser = async (req, res) => {
    try {
        const type = await TypeUser.findOne({ _id: req.params.id });
        if (type) {
            await TypeUser.findByIdAndDelete(req.params.id);
            return res.status(200).send('Type deleted.');
        }
    } catch (error) {
        return res.status(402).send(error);
    }
}

controller.getTypeUserByDesc = async (req, res) => {
    try {
        const type = await TypeUser.findOne({ description: req.params.desc });
        return res.status(200).json(type);
    } catch (error) {
        return res.status(402).send(error);
    }
}

module.exports = controller;