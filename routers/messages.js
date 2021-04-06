const { Router } = require('express');
const { chat } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:de', validateJWT, chat);

module.exports = router;