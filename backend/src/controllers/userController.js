const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;
controller = {}

controller.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        return res.status(200).send(error);
    }
}

controller.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(200).send("This user doesn't exists");
    } catch (error) {
        return res.status(402).send(error);
    }

}

controller.deleteUser = async (req, res) => {
    try {
        const find = await User.findOne({ _id: req.params.id });
        if (find) {
            await User.findByIdAndDelete(find._id);
            return res.status(200).send('User deleted.');
        }
        return res.status(200).send("This user doesn't exists");
    } catch (error) {
        return res.status(402).send(error);
    }
}

controller.addUser = async (req, res) => {
    try {
        const { rut } = req.body;
        const user = await User.findOne({ rut });
        if (!user) {
            const newUser = new User(req.body);
            newUser.login_fk = req.loginId;
            created = await newUser.save();
            return res.status(200).json(created);
        } else {
            return res.status(401).send('This user already exists');
        }

    } catch (error) {
        return res.status(402).send(error);
    }
}

controller.getSchedulesByUserId = async (req, res) => {
    try {
        const data = await User.aggregate(
            [
                {
                    $match: {
                        _id: ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: 'patientdatas',
                        localField: '_id',
                        foreignField: 'kine_fk',
                        as: 'patientData'
                    }
                },
                {
                    $unwind: '$patientData'
                },
                {
                    $lookup: {
                        from: 'schedules',
                        localField: 'patientData._id',
                        foreignField: 'patientData_fk',
                        as: 'schedules'
                    }
                },
                {
                    $unwind: '$patientData'
                }
            ]
        );
        console.log(data);
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

// Consulta que obtiene el nombre, el email, el genero, la especializacion, typeuser
controller.getSpecializationByKineId = async (req, res) =>{
    try {
        const data = await User.aggregate(
            [
                {
                    $match: {
                        _id: ObjectId("5e3da73ef3d6891cd4bcfa1c")
                    }
                },
                {
                    $lookup: {
                        from: 'kine_datas',
                        localField: '_id',
                        foreignField: 'user_fk',
                        as: 'kine_data'
                    }
                },
                {
                    $unwind: '$kine_data'
                },
                {
                    $lookup: {
                        from: 'specializations',
                        localField: 'kine_data.specialization_fk',
                        foreignField: '_id',
                        as: 'specialization'
                    }
                },
                {
                    $unwind: '$specialization'
                },
                {
                    $lookup: {
                        from: 'typeusers',
                        localField: 'typeUser_fk',
                        foreignField: '_id',
                        as: 'typeUser'
                    }
                },
                {
                    $unwind: '$typeUser'
                },
                {
                    $project: {
                        firstName:'firstName',
                        lastName: 'lastName',
                        email: 'email',
                        gender: 'gender',
                        specialization: '$specialization.description',
                        typeuser: '$typeUser.description'
                    }
                }
            ]
        );
        return res.status(200).json(data);
    } catch (error) {
        return res.status(402).send(error);
    }  
}

controller.getUserByLoginId = async (req, res) =>{
    try {
        const user = await User.findOne({login_fk:req.params.login_id});
        return res.status(200).json(user)
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = controller;