const Joi = require('joi')

const balSheetSchema = Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().integer().min(1900).max(new Date().getFullYear()).required()
});

module.exports = {
    balSheetSchema
}