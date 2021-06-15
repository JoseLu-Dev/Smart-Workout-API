const BaseController = require('../../common/base.controller')
const BandsModel = require('./bands.model')

class UsersController extends BaseController {
  constructor() {
    super(BandsModel)
  }

  put = async (req, res) => {
    req.body.userId = req.userId;
    if (!req.body.id) {
      try {
        const band = new this.model(req.body)
        band.save((err, item) => {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          }
          return res.status(200).json(item);
        })
      } catch (err) {
        console.log(err)
        return res.sendStatus(400)
      }
    } else { 
    this.model.updateOne({ userId: req.userId, _id: req.body.id }, req.body, { upsert: true }, (err, item) => {
      if (err) {
        console.error(err)
        return res.sendStatus(400)
      }
      return res.status(200).json(item);
    })
  }
}

getAllOfUser = async (req, res) => {
  try {
    const bands = await this.model.find({ userId: req.userId });
    res.status(200).json(bands)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}
}

module.exports = UsersController
