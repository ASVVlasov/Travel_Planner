const TravelController = require('../controllers/travel/travelController')
const router = require('express').Router()

router.get('/:travelId', async (req, res) => {
   try {
      res.json(await TravelController.getFullTravelInfo(req.params.travelId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.get('/:cardType/:travelId', async (req, res) => {
   try {
      const { cardType, travelId } = req.params
      res.json(await TravelController.getTravelByCardType(cardType, travelId))
   } catch (errorMessage) {
      res.status(500).send(errorMessage)
   }
})
router.get('/', async (req, res) => {
   try {
      res.json(await TravelController.getAllTravels())
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.post('/', async (req, res) => {
   try {
      res.json(await TravelController.createTravel(req.body))
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