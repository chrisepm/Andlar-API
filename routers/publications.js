const author = require("../models/publication");

class PublicationRouter {

    static create(event, context, callback) {
        new author.PublicationService().create(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
        });
    }
    static list(event, context, callback) {
        new author.PublicationService().list(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
        });
    }
    static get(event, context, callback) {
        new author.PublicationService().get(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
        });
    }
    static update(event, context, callback) {
        new author.PublicationService().update(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
        });
    }
    static delete(event, context, callback) {
        new author.PublicationService().delete(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
        });
    }
    static filter(event, context, callback) {
        new author.PublicationService().filter(event, (err, result) => {
            PublicationRouter.respose(context, err, result);
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
exports.PublicationRouter = PublicationRouter;
