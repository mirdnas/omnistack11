/* 
Params:
    Query
    Router
    Body
*/
var express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')

const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

/* Login */
routes.post('/sessions', celebrate({
    [ Segments.BODY ] : Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.createController);


/* ongs list */
routes.get('/ongs', OngController.indexController )


/* ongs create */
routes.post('/ongs', celebrate({
    [ Segments.BODY ] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) ,  OngController.createController )


/* incidents create */
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [ Segments.BODY ] : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number()
    })
}), IncidentController.createController )


/* incidents list */
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.indexController )

/* incident delete */
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.deleteController )


/* profile detail */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.indexController )


module.exports = routes;