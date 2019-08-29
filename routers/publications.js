"use strict";

const author = require("../models/publication");

class PublicationRouter {

    static create(event, context, callback) {
        new author.PublicationService().create(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static list(event, context, callback) {
        new author.PublicationService().list(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static get(event, context, callback) {
        new author.PublicationService().get(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static update(event, context, callback) {
        new author.PublicationService().update(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static delete(event, context, callback) {
        new author.PublicationService().delete(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static filter(event, context, callback) {
        new author.PublicationService().filter(event, (error, result) => {
            PublicationRouter.respose(context, error, result);
        });
    }
    static respose(context, error, result) {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                result: !error,
                data: result,
                message: error
            })
        };
        context.succeed(response);
    }
}
exports.PublicationRouter = PublicationRouter;
