const Joi = require('joi');

const summarySchema = Joi.object({
    year: Joi.number().integer().min(1900).max(2100).required(),
    profit: Joi.number().integer().required(),
});


const getDecisionSchema = Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    loanAmount: Joi.number().positive().required(),
    preAssessment: Joi.number().integer().min(0).max(100).required(),
    summary: Joi.array().items(summarySchema)
});

module.exports = {
    getDecisionSchema
}