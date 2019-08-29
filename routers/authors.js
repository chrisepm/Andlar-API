"use strict";

const author = require("../models/author");

class AuthorRouter {

    static create(event, context, callback) {
        new author.AuthorService().create(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
        });
    }
    static list(event, context, callback) {
        new author.AuthorService().list(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
        });
    }
    static get(event, context, callback) {
        new author.AuthorService().get(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
        });
    }
    static update(event, context, callback) {
        new author.AuthorService().update(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
        });
    }
    static delete(event, context, callback) {
        new author.AuthorService().delete(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
        });
    }
    static filter(event, context, callback) {
        new author.AuthorService().filter(event, (error, result) => {
            AuthorRouter.respose(context, error, result);
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
exports.AuthorRouter = AuthorRouter;
