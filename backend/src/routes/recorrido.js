const {Router} = require('express');
const router = Router();
const {getRecorrido} = require('../controllers/recorrido.controller');

router.route('/recorrido')
    .get(getRecorrido)

module.exports = router;