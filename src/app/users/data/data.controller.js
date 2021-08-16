const BaseController = require('../../common/base.controller')
const DataModel = require('./data.model')

class UsersController extends BaseController {
  constructor() {
    super(DataModel)
  }

  getByUserId = async (req, res) => {
    this.model.findOne({ userId: req.userId }, (err, item) => {
      if (err) {
        res.sendStatus(400);
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  putUserWeight = async (req, res) => {
    this.model.findOne({ userId: req.userId }, (err, item) => {
      if (err) {
        res.sendStatus(400);
        return console.error(err);
      }
      item.weight = req.body.weight
      try {
        item.save()
      } catch (err) {
        console.log(err)
        return res.sendStatus(500)
      }
      res.sendStatus(200)
    });
  }

  getUserWeight = async (req, res) => {
    try {
      const weight = (await this.model.findOne({ userId: req.userId }).select({ weight: 1, _id: 0 })).weight
      res.status(200).json(weight)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  }
}

module.exports = UsersController
