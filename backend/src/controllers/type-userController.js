const { TypeUser } = require('../models');
controller = {}

controller.getAll = async (req, res) => {
    try {
        const types = await TypeUser.find();
    res.status(200).json(types);
    } catch {
    res.status(402).send('no rows');
    }
}

controller.getTypeById = async (req, res) => {
    try {
        const type = await TypeUser.findById(req.params.id);
        if(type){
            res.status(200).json(type);
        }
    } catch (error) {
        res.status(402).send(error);
    }
}

controller.addType = async (req, res) => {
    try {
        const { description } = req.body;
    const newType = new TypeUser({description});
    await newType.save();
    } catch (error) {
    return res.status(402).send(error);
    }
    
}

controller.deleteType = async (req, res) => {
    try {
        const type = await TypeUser.findOne({_id:req.params.id});
        if(type){
            await TypeUser.findByIdAndDelete(req.params.id);
            return res.status(200).send('Type deleted.');
        }
    } catch (error) {
        return res.status(402).send(error);
    }
}

controller.getTypeByDesc = async (req, res) => {
    try {
        const type = await TypeUser.findOne({description:req.params.desc});
        return res.status(200).json(type);
    } catch (error) {
        return res.status(402).send(error);
    }
}

module.exports = controller;