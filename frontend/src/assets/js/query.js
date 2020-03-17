
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

// get agendas by kineid

db.agendas.aggregate([
    {
        $match:{
            kine_fk: ObjectId("5e4ca2ea62d4d8200cbefb41")
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
]).pretty()

db.patient_datas.aggregate([
    {
        $match:{
            patient_fk:ObjectId('5e4cb2fe1adb311ff8fb8dca')
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
]).pretty()

// Todos los kine_datas
db.kinedatas.aggregate([
    {
        $lookup:{
            from: 'specializations',
            localField: 'specialization_fk',
            foreignField: '_id',
            as: 'specialization'
        }
    },
    {
        $lookup:{
            from: 'users',
            localField: 'kine_fk',
            foreignField: '_id',
            as: 'user'
        }
    }
]).pretty()

// Agendas por kine y fecha
db.agendas.aggregate([
    {
        $match:{
            kine_fk: ObjectId('5e4cc3a23800d31a50afe6f2'),
            date: ISODate('2020-02-19T05:13:29.291Z')
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
]).pretty()

db.agendas.find({date:{$gte: ISODate("2020-02-26T00:00:00Z"), $lt: ISODate("2020-02-26T23:59:59Z")}}).pretty()