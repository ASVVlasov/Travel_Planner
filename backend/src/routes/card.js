const router = require('express').Router()
const FileController = require('../controllers/file/fileController')
const CardController = require('../controllers/card/cardController')

router.post('/uploadFile', async (req, res) => {
   try {
      const { travelId, cardId } = req.body
      res.json(await CardController.addFile(travelId, cardId, req.files.file))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

router.post('/dropFile', async (req, res) => {
   try {
      const { travelId, cardId, fileId } = req.body
      res.json(await CardController.removeFile(travelId, cardId, fileId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.post('/:travelId', async (req, res) => {
   try {
      res.json(await CardController.createCard(req.params.travelId, req.body))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.get('/:travelId/', async (req, res) => {
   try {
      res.json(await CardController.getAllCards(req.params.travelId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.get('/:travelId/:cardId', async (req, res) => {
   try {
      const { travelId, cardId } = req.params
      res.json(await CardController.readCard(travelId, cardId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.put('/', async (req, res) => {
   try {
      const { travelId, card } = req.body
      res.json(await CardController.updateCard(travelId, card))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})
router.delete('/:travelId/:cardId', async (req, res) => {
   try {
      const { travelId, cardId } = req.params
      res.json(await CardController.deleteCard(travelId, cardId))
   } catch (errorMessage) {
      res.status(500).json(errorMessage)
   }
})

module.exports = router
