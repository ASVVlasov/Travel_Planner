const BoardController = require('../controllers/board/BoardController')
const router = require('express').Router()

router.get('/:boardId', async (req, res) => {
   res.json(await BoardController.read(req.params.boardId))
})

router.post('/', async (req, res) => {
   res.json(await BoardController.create(req.body))
})

router.put('/', async (req, res) => {
   res.json(await BoardController.update(req.body))
})

router.delete('/:boardId', async (req, res) => {
   res.json(await BoardController.delete(req.params.boardId))
})

module.exports = router
