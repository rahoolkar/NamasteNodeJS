const Joi = require('joi');

const userJoiSchema = Joi.object({
    firstname : Joi.string()
    .min(1)
    .max(10)
    .required(),

    lastname : Joi.string()
    .alphanum()
    .min(1)
    .max(10)
    .required(),
    
    age : Joi.number()
    .integer()
    .min(18)
    .max(80),

    email: Joi.string(),
    
    password: Joi.string()
        .required()

});

module.exports = userJoiSchema;