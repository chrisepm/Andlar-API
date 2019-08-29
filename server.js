const authorRouter = require("./routers/authors").AuthorRouter;
const publicationRouter = require("./routers/publications").PublicationRouter;

module.exports.author = authorRouter;
module.exports.publication = publicationRouter;

