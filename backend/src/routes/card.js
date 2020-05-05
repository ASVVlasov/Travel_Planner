const Traveler = {}
Traveler.create = require("../controllers/traveler/create")
Traveler.read = require("../controllers/traveler/read")
Traveler.update = require("../controllers/traveler/update")
Traveler.delete = require("../controllers/traveler/delete")
const Card = {}
Card.create = require("../controllers/card/create")
Card.read = require("../controllers/card/read")
Card.update = require("../controllers/card/update")
Card.delete = require("../controllers/card/delete")
const router = require('express').Router();
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
 *                 - $ref: '#/components/schemas/Transport'
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
 *                             description: traveler nuckname(login)
 *                           avatarPath:
 *                             type: string
 *                             description: path on server, where traveler avatar lays
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
router.get('/', async (req, res) => {
    // reqCard - запрашиваемая карточка
    let reqCard = await Card.read(req)
    if (reqCard.statusCode !== 200) { // Обработка ошибки
        let statusCode = reqCard.statusCode
        delete reqCard.statusCode
        res.status(statusCode).json(reqCard)
    }
    // body - тело для response
    let body = JSON.parse(JSON.stringify(reqCard.result))
    let extendedTravelers = []
    for (let i = 0; i < body.travelers.length; i++) {
        let id = body.travelers[i]
        let req = {}
        req.body = {}
        req.body.travelerID = id
        let reqTraveler = await Traveler.read(req)
        if (reqTraveler.statusCode !== 200) { // Обработка ошибки
            continue // Исключаем мертвые id из дальнейшей обработки
        }
        extendedTravelers.push({
            id: id,
            nickname: reqTraveler.result.login,
            avatarPath: reqTraveler.result.avatarPath
        })
    }
    body.extendedTravelers = extendedTravelers
    res.status(reqCard.statusCode).json(body)
})

router.post('/', async (req, res) => {
    let body = {}
    body.status = "OK"
    res.status(200).json(body)
})

module.exports = router