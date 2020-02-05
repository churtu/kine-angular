const router = require('express').Router();
const { loginController } = require('../controllers/index');

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

module.exports = router;