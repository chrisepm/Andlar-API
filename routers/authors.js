const author = require("../models/author");

class AuthorRouter {

    static create(event, context, callback) {
        new author.AuthorService().create(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static list(event, context, callback) {
        new author.AuthorService().list(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static get(event, context, callback) {
        new author.AuthorService().get(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static update(event, context, callback) {
        new author.AuthorService().update(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static delete(event, context, callback) {
        new author.AuthorService().delete(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static filter(event, context, callback) {
        new author.AuthorService().filter(event, (err, result) => {
            AuthorRouter.respose(context, err, result);
        });
    }
    static respose(context, err, result) {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                result: !err,
                data: result,
                message: err
            })
        };
        context.succeed(response);
    }
}
exports.AuthorRouter = AuthorRouter;
