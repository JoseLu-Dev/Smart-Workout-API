/**
 * Class to add basic methods to controllers using inheritance
 * @class BaseController
 */
class BaseController {

    /**
     * 
     * @param {*} model the model that the controller will use to do queries
     */
    constructor(model) {
        this.model = model;
        //this.create = this.create.bind(this);
    }

    /**
     * Get all model objects
     * @param {*} req 
     * @param {*} res 
     */
    getAll = (req, res) => {
        this.model.find({}, (err, docs) => {
            if (err) { return console.error(err); }
            res.status(200).json(docs);
        });
    }

    /**
     * Count all
     * @param {*} req 
     * @param {*} res 
     */
    count = (req, res) => {
        this.model.count((err, count) => {
            if (err) { return console.error(err); }
            res.status(200).json(count);
        });
    }

    /**
     * Insert
     * @param {*} req 
     * @param {*} res 
     */
    insert = (req, res) => {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                return res.sendStatus(409);
            }
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.status(200).json(item);
        });
    }

    /**
     * Get by id
     * @param {*} req 
     * @param {*} res 
     */
    get = (req, res) => {
        this.model.findOne({ _id: req.params.id }, (err, item) => {
            if (err) { return console.error(err); }
            res.status(200).json(item);
        });
    }

    /**
     * Update by id
     * @param {*} req 
     * @param {*} res 
     */
    update = (req, res) => {
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400);
            }
            if (err) {
                res.sendStatus(400);
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }

    /**
     * Delete by id
     * @param {*} req 
     * @param {*} res 
     */
    delete = (req, res) => {
        this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
            if (err) { return console.error(err); }
            res.sendStatus(200);
        });
    }
}

module.exports = BaseController