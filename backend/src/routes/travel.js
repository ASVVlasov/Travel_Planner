const TravelController = require('../controllers/board/travelController')
const router = require('express').Router()

router.get('/:travelId', async (req, res) => {
   try {
      res.json(await TravelController.read(req.params.travelId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

router.post('/', async (req, res) => {
   try {
      res.json(await TravelController.create(req.body))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

router.put('/', async (req, res) => {
   try {
      res.json(await TravelController.update(req.body))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

router.delete('/:travelId', async (req, res) => {
   try {
      res.json(await TravelController.delete(req.params.travelId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

module.exports = router
