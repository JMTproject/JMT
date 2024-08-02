const express = require('express')
const router = express.Router();
const { adminRp, adminUL } = require('../controller/admin')

router.post('/recipelist', adminRp)
router.post('/userlist', adminUL )



module.exports = router;