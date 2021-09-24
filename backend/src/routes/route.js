const {Router} = require('express');
const router = Router();
const { postRoute} = require('../controllers/route.controller');

router.route('/route')
    .post(postRoute)

module.exports = router;