const router = require('express').Router();
const swagger = require("./swagger")

router.use('/api-docs', swagger);
router.get('/api-docs', swagger);


module.exports = router;