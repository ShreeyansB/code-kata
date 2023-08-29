const Joi = require('joi')

const fetchBalSheetSchema = Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    loanAmount: Joi.number().positive().required(),
    accountingProvider: Joi.string().required()
});

module.exports = {
    fetchBalSheetSchema
}