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