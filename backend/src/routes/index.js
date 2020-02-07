const router = require('express').Router();
const { loginController, typeUserController, userController } = require('../controllers/index');
const { verifyToken } = require('../guard/verifyToken');

// LOGINS ROUTES

router.route('/logins')
    .get(loginController.getAll);

router.route('/logins/signup')
    .post(loginController.signUp);

router.route('/logins/signin')
    .post(loginController.signIn);

router.route('/logins/:id')
    .get(loginController.getLogin)
    .delete(loginController.delete)
    .put(loginController.update);

// TYPE_USER ROUTES
router.route('/type-user')
    .post(typeUserController.addType)
    .get(typeUserController.getAll);

router.route('/type-user/:id')
    .delete(typeUserController.deleteType)
    .get(typeUserController.getTypeById);

router.route('/type-user/desc/:desc')
    .get(typeUserController.getTypeByDesc);

// USER ROUTES
router.route('/users')
    .get(userController.getAll)
    .post(verifyToken,userController.addUser);

router.route('/users/:id')
    .get(userController.getUserById);

router.route('/users/delete/:id')
    .delete(userController.deleteUser);

module.exports = router;