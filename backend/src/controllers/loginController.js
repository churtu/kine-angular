const { Login, User } = require('../models');
const jwt = require('jsonwebtoken');
controller = {}

controller.getAllLogins = async (req, res) => {
    try {
        const logins = await Login.find();
        if (logins.length != 0) {
            return res.status(200).json(logins);
        } else {
            return res.status(401).send('No rows');
        }
    } catch (error) {
        return res.status(402).send(console.log(error));
    }
}

controller.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await Login.findOne({ username });
        if (!login) {
            const newLogin = new Login({ username, password });
            newLogin.password = await newLogin.encryptPassword(password);
            await newLogin.save();
            const token = await jwt.sign({ _id: newLogin._id }, 'cufifa');
            return res.status(200).json({ token });
        } else {
            return res.status(401).send('This user is already exists');
        }
    } catch (error) {
        return res.status(402).send(console.log(error));
    }
}

controller.signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await Login.findOne({ username });
        if(login){
            const matchPassword = await login.verifyPassword(password);
            if(matchPassword){
                const token = await jwt.sign({_id:login._id}, 'cufifa');
                const user = await User.findOne({login_fk:login._id});
                if(user){
                    return res.status(200).json({token, user});
                }
                return res.status(200).json({token});
            }else{
                return res.status(401).send("This user and/or password are incorrects");
            }
        }else{
            return res.status(401).send("This user and/or password are incorrects");
        }
    } catch (error) {
        return res.status(402).send(console.log(error));
    }
}

controller.getLogin = async (req, res) => {
    try {
        const login = await Login.findOne({_id:req.params.id});
        if(login){
            return res.status(200).json(login);
        }else{
            return res.status(401).send("This login aren't exists");
        }
    } catch (error) {
        console.log(error);
        return res.status(402).send("This login aren't exists");
    }
}

controller.deleteLogin = async (req, res) => {
    try {
        const deleted = await Login.findByIdAndDelete(req.params.id);
        if(deleted){
            return res.status(200).send('Login deleted');
        }else{
            return res.status(401).send("This login aren't exists");
        }
    } catch (error) {
        console.log(error);
        return res.status(402).send("This login aren't exists");
    }
}

controller.updateLogin = async (req, res) => {
    res.send('Update login');
}

module.exports = controller;