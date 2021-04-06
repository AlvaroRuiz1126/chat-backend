const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//create new users
router.post('/new', [
    check('nombre', 'el nombre es obligatorio').isString().not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validateFields
], createUser);

//login
router.post('/', [
    //validacion de que venga el campo email en la request. .isEmail() nos asegura que venga un email
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateFields
], login);

//renew token
router.get('/renew', validateJWT, renewToken);

module.exports = router;