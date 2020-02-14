
db.users.aggregate(
    [
        {
            $match: {
                _id: ObjectId("5e3da73ef3d6891cd4bcfa1c")
            }
        },
        {
            $lookup:{
                from:'patientdatas',
                localField:'_id',
                foreignField:'kine_fk',
                as:'patientData'
            }
        },
        {
            $unwind: '$patientData'
        },
        {
            $lookup:{
                from:'schedules',
                localField:'patientData._id',
                foreignField:'patientData_fk',
                as:'schedules'
            }
        },
        {
            $unwind: '$patientData'
        }
    ]
).pretty()

// AGENDA

db.agendas.aggregate([
    {
        $match:{
            kine_fk: ObjectId("5e3da73ef3d6891cd4bcfa1c")
        }
    },
    {
        $lookup:{
            from:'users',
            localField: 'kine_fk',
            foreignField: '_id',
            as: 'user'
        },
    },
    {
        $lookup:{
            from:'users',
            localField: 'patient_fk',
            foreignField: '_id',
            as: 'patient'
        },
    }
]).pretty()

db.patient_datas.aggregate([
    {
        $match:{
            user_fk: ObjectId("5e3f1712e6db072f884bce32")
        }
    },
    {
        $lookup:{
            from:'treatments',
            localField: '_id',
            foreignField: 'patient_data_fk',
            as: 'treatment'
        },
    }
]).pretty()