const router = require('express').Router();
const { 
    loginController,
    typeUserController, 
    userController, 
    patientDataController, 
    specializationController,
    kineDataController,
    treatmentController,
    sessionController,
    typeEvaluationController,
    evaluationController
} = require('../controllers/index');
const { verifyToken } = require('../guard/verifyToken');

// LOGINS ROUTES -----------------------------------------------------
router.route('/logins')
    .get(loginController.getAllLogins);

router.route('/logins/signup')
    .post(loginController.signUp);

router.route('/logins/signin')
    .post(loginController.signIn);

router.route('/logins/:id')
    .get(loginController.getLogin)
    .delete(loginController.deleteLogin)
    .put(loginController.updateLogin);

// TYPE_USER ROUTES --------------------------------------------------
router.route('/type-user')
    .post(typeUserController.addTypeUser)
    .get(typeUserController.getAllTypeUsers);

router.route('/type-user/:id')
    .delete(typeUserController.deleteTypeUser)
    .get(typeUserController.getTypeUserById);

router.route('/type-user/desc/:desc')
    .get(typeUserController.getTypeUserByDesc);

// USER ROUTES -------------------------------------------------------
router.route('/users')
    .get(userController.getAllUsers)
    .post(verifyToken,userController.addUser);

router.route('/users/:id')
    .get(userController.getUserById);

router.route('/users/specialization/:id')
    .get(userController.getSpecializationByKineId);

router.route('/users/delete/:id')
    .delete(userController.deleteUser);

router.route('/users/:id/schedules')
    .get(userController.getSchedulesByUserId);

router.route('/users/byLoginId/:login_id')
    .get(userController.getUserByLoginId);
    
// PATIENT ROUTES ----------------------------------------------------
router.route('/patient-data')
    .get(patientDataController.getPatientsData)
    .post(patientDataController.addPatientData);

router.route('/patient-data/:id')
    .get(patientDataController.getPatientData)
    .delete(patientDataController.deletePatientData);

// SPECIALIZATION ROUTES ---------------------------------------------
router.route('/specializations')
    .get(specializationController.getAllSpecializations)
    .post(specializationController.addSpecialization);

router.route('/specializations/:id')
    .get(specializationController.getSpecialization)
    .delete(specializationController.deleteSpecialization);

// KINE_DATA ROUTES -------------------------------------------------
router.route('/kine-data')
    .get(kineDataController.getAllKineData)
    .post(kineDataController.addKineData);

router.route('/kine-data/:id')
    .get(kineDataController.getKineData)
    .delete(kineDataController.deleteKineData);

// TREATMENT ROUTES -------------------------------------------------
router.route('/treatments')
    .get(treatmentController.getAllTreatments)
    .post(treatmentController.addTreatment);

router.route('/treatments/:id')
    .get(treatmentController.getTreatment)
    .delete(treatmentController.deleteTreatment);

// SESSIONS ROUTES --------------------------------------------------
router.route('/sessions')
    .get(sessionController.getAllSessions)
    .post(sessionController.addSession);

router.route('/sessions/:id')
    .get(sessionController.getSession)
    .delete(sessionController.deleteSession);

// TYPE_EVALUATION ROUTES
router.route('/type-evaluations')
    .get(typeEvaluationController.getAllTypeEvaluations)
    .post(typeEvaluationController.addTypeEvaluation);

router.route('/type-evaluations/:id')
    .get(typeEvaluationController.getTypeEvaluation)
    .delete(typeEvaluationController.deleteTypeEvaluation);

// EVALUATIONS ROUTES
router.route('/evaluations')
    .get(evaluationController.getAllEvaluations)
    .post(evaluationController.addEvaluation);

router.route('/evaluations/:id')
    .get(evaluationController.getEvaluation)
    .delete(evaluationController.deleteEvaluation);

module.exports = router;