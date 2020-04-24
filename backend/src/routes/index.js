const router = require('express').Router();

// TODO заглушку надо будет выпилить
router.get('/', (req, res) => {
   res.json(`Requested path is ${req.url}`);
});

module.exports = router;
