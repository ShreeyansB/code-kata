const Joi = require('joi');
const myConstants = require('./constants');

const fetchBalSheetSchema = Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().integer().min(1900).max(2100).required(),
    accountingProvider: Joi.string().valid(...myConstants.ACCOUNTING_PROVIDERS).required()
});

const monthlyDataSchema = Joi.object({
    year: Joi.number().integer().min(1900).max(2100).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    profitOrLoss: Joi.number().required(),
    assetsValue: Joi.number().required(),
});

const fetchDecisionSchema = Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().integer().min(1900).max(2100).required(),
    loanAmount: Joi.number().positive().required(),
    accountingProvider: Joi.string().valid(...myConstants.ACCOUNTING_PROVIDERS).required(),
    balanceSheet: Joi.array().items(monthlyDataSchema).required()
});

module.exports = {
    fetchBalSheetSchema,
    fetchDecisionSchema
}