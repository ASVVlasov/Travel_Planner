const router = require('express').Router()
const FileController = require('../controllers/file/fileController')
const CardController = require('../controllers/card/cardController')
/**
 * @swagger
 *
 * /board/{boardID}/{cardType}/card/{cardID}:
 *   get:
 *     description: Card information
 *     tags:
 *       - developers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: boardID
 *         description: ID for travel board where card lays
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "5ea7e8133d09ef3d289b717b"
 *       - name: cardType
 *         description: type of the card(transport, todo, etc.)
 *         in: path
 *         required: true
 *         example: "transport"
 *         schema:
 *           type: string
 *           enum:
 *             - transport
 *             - entertainment
 *             - accomodation
 *             - todo
 *       - name: cardID
 *         description: ID for wanted card
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "5ea8345edcb74011d4fab672"
 *     responses:
 *      200:
 *         description: requested card
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - oneOf:
 *                     - $ref: '#/components/schemas/Transport'
 *                     - $ref: '#/components/schemas/Todo'
 *                     - $ref: '#/components/schemas/Accomodation'
 *                     - $ref: '#/components/schemas/Entertainment'
 *                   discriminator:
 *                     propertyName: cardType
 *                     mapping:
 *                       transport: '#/components/schemas/Transport'
 *                       todo: '#/components/schemas/Todo'
 *                       accomodation: '#/components/schemas/Accomodation'
 *                       entertainment: '#/components/schemas/Entertainment'
 *                 - type: object
 *                   properties:
 *                     extendedTravelers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: travelerID
 *                           nickname:
 *                             type: string
 *                             description: traveler nickname(login)
 *                           avatarPath:
 *                             type: string
 *                             description: path on server, where traveler avatar lays
 *             examples:
 *               transportCard:
 *                 value:
 *                   travelers: ["5ea44edd700f73350430d726", "5ea6cf0819c47629e49f8618"]
 *                   payer: "5ea44edd700f73350430d726"
 *                   cost: 250
 *                   transport: "Такси"
 *                   company: "Yandex"
 *                   departurePlace: "Самара, ул. Победы, 10"
 *                   departureDate: 2020-04-28T13:49:18.024+00:00
 *                   arrivalPlace: "Самара, Волжский проспект, 4"
 *                   arrivalDate: 2020-04-28T13:49:18.024+00:00
 *                   comment: "Купить все самое нужное для поездки"
 *                   extendedTravelers:
 *                     - id: 5ea44edd700f73350430d726
 *                       nickname: "Вася"
 *                       avatarPath: "default avatar path"
 *                     - id: 5ea6cf0819c47629e49f8618
 *                       nickname: "Петя"
 *                       avatarPath: "another avatar path"
 *                 summary: "Transport card example"
 *
 *
 *      400:
 *         description: request error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Request error description
 *                   example: "Request error: empty boardID"
 *      500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Server error description
 *                   example: "Database error: can't read entry / entry doesn't exist"
 *                 error:
 *                   type: object
 *                   description: service object
 */
// router.get('/', async (req, res) => {
//     // reqCard - запрашиваемая карточка
//     let reqCard = await Card.read(req)
//     if (reqCard.statusCode !== 200) { // Обработка ошибки
//         let statusCode = reqCard.statusCode
//         delete reqCard.statusCode
//         res.status(statusCode).json(reqCard)
//     }
//     // body - тело для response
//     let body = JSON.parse(JSON.stringify(reqCard.result))
//     let extendedTravelers = []
//     for (let i = 0; i < body.travelers.length; i++) {
//         let id = body.travelers[i]
//         let req = {}
//         req.body = {}
//         req.body.travelerID = id
//         let reqTraveler = await Traveler.read(req)
//         if (reqTraveler.statusCode !== 200) { // Обработка ошибки
//             continue // Исключаем мертвые id из дальнейшей обработки
//         }
//         extendedTravelers.push({
//             id: id,
//             nickname: reqTraveler.result.login,
//             avatarPath: reqTraveler.result.avatarPath
//         })
//     }
//     body.extendedTravelers = extendedTravelers
//     res.status(reqCard.statusCode).json(body)
// })

// router.post('/', async (req, res) => {
//     let body = {}
//     body.status = "OK"
//     res.status(200).json(body)
// })

router.post('/uploadFile', async (req, res) => {
   try {
      const { travelId, cardId, file } = req.body
      res.json(await CardController.addFile(travelId, cardId, file))
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
