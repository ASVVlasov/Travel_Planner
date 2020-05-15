const router = require('express').Router()

router.post('/uploadFile', async (req, res) => {
   try {
      const { travelId, cardId } = req.body
      //res.json(await CardController.addFile(travelId, cardId, req.files.file))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})

router.post('/dropFile', async (req, res) => {
   try {
      const { travelId, cardId, fileId } = req.body
      //res.json(await CardController.removeFile(travelId, cardId, fileId))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})
router.post('/', async (req, res) => {
   try {
      req.body.travelId = '5eb9a8ae468c2a28eb4220f0'
      //res.json(await CardController.createCard(req.body))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})
router.get('/:travelId/', async (req, res) => {
   try {
      //res.json(await CardController.getAllCards(req.params.travelId))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})
router.get('/:travelId/:cardId', async (req, res) => {
   try {
      const { travelId, cardId } = req.params
      //res.json(await CardController.readCard(travelId, cardId))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})
router.put('/', async (req, res) => {
   try {
      const { travelId, card } = req.body
      //res.json(await CardController.updateCard(travelId, card))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})
router.delete('/:travelId/:cardId', async (req, res) => {
   try {
      const { travelId, cardId } = req.params
      //res.json(await CardController.deleteCard(travelId, cardId))
   } catch (errorMessage) {
      res.status(500).json({ message: errorMessage.message })
   }
})

module.exports = router
