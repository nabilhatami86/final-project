const Tags = require('./model')

const createTag = async (req, res, next) => {
    try {
        let payload = req.body;
        let tag = new Tags(payload);
        await tag.save();
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
}

const updateTag = async (req, res, next) => {
    try {
        let payload = req.body;
        let tag = await Tags.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'validationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
}

const deleteTag = async (req, res, next) => {
    try {
        let tag = await Tags.findByIdAndDelete(req.params.id);
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'ValidatinError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
}

const getTag = async (req, res, next) => {
    try {
        let tag = await Tags.find();
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
}

module.exports = {
    createTag,
    updateTag,
    deleteTag,
    getTag
}