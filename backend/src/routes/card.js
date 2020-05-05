const router = require('express').Router();
/**
 * @swagger
 *
 * /board/{boardID}/{cardType}/card/{cardID}:
 *   get:
 *     description: Card information
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
 *       200:
 *         description: login
 */

router.get('/', function (req, res) {
    console.log(req.params.boardID)
    res.json({
        status: "OK"
    })
})

module.exports = router