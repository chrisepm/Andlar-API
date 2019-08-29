const dynamoose = require('dynamoose');
const uuid = require("uuid");

dynamoose.AWS.config.update({
    accessKeyId : process.env.AWS_KEY_ID,
    secretAccessKey : process.env.AWS_KEY_SECRET,
    region : 'us-east-1'
});

const Author = dynamoose.model('author', {
    id: String,
    name: String,
    email: String,
    birthday: String
});
const Publication = dynamoose.model('publication', {
    id: String,
    authorId: String,
    title: String,
    body: String,
    date: String,
});

class PublicationService {

    constructor() {
        this.table = 'publication';
    }

    list(event, callback) {
        Publication.scan().exec()
            .then(function(rows) {
                return Promise.all(rows.map(function(row) {
                    return row.populate({
                        path: 'authorId',
                        model: 'author'
                    });
                }));
            })
            .then(function(rows) {
                callback(null, rows);
            });
    }

    get(event, callback) {
        Publication.get({
            id: event.pathParameters.id
        }).then(function(row) {
            if (row) {
                return row.populate({
                    path: 'authorId',
                    model: 'author'
                });
            } else {
                callback(null);
            }
        })
        .then(function(rows) {
            callback(null, rows);
        });
    }

    create(event, callback) {
        const data = JSON.parse(event.body);
        data.id = uuid.v1();

        const publication = new Publication(data);
        publication.save(function (err) {
            callback(err, data);
        });
    }

    update(event, callback) {
        const data = JSON.parse(event.body);
        data.id = event.pathParameters.id;

        Publication.update({id: data.id}, data, function (err) {
            callback(err, data);
        });
    }

    delete(event, callback) {
        Publication.delete({ id: event.pathParameters.id }, function (err) {
            callback(err, event.pathParameters.id);
        });
    }

    filter(event, callback) {
        const data = JSON.parse(event.body);
        var params = {
            TableName: this.table
        };

        if (data.id) {
            params.FilterExpression = "contains (#id, :id)";
            params.ExpressionAttributeNames = {
                "#id": "id",
            };
            params.ExpressionAttributeValues = {
                ":id": data.id || ' '
            };
        }

        if (data.authorId) {
            params.FilterExpression = "contains (#authorId, :authorId)";
            params.ExpressionAttributeNames = {
                "#authorId": "authorId",
            };
            params.ExpressionAttributeValues = {
                ":authorId": data.authorId || ' '
            };
        }
        Publication.scan(params).exec()
            .then(function(rows) {
                return Promise.all(rows.map(function(row) {
                    return row.populate({
                        path: 'authorId',
                        model: 'author'
                    });
                }));
            })
            .then(function(rows) {
                callback(null, rows);
            });
    }
}

exports.PublicationService = PublicationService;
