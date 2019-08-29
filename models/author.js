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

class AuthorService {

    constructor() {
        this.table = 'author';
    }

    list(event, callback) {
        Author.scan().exec()
            .then(function(rows) {
                callback(null, rows);
            })
    }

    get(event, callback) {
        Author.get({
            id: event.pathParameters.id
        }).then(function(row) {
            callback(null, row);
        });
    }

    create(event, callback) {
        const data = JSON.parse(event.body);
        data.id = uuid.v1();

        const author = new Author(data);
        author.save(function (err) {
            callback(err, data);
        });
    }

    update(event, callback) {
        const data = JSON.parse(event.body);
        data.id = event.pathParameters.id;

        Author.update({id: data.id}, data, function (err) {
            callback(err, data);
        });
    }

    delete(event, callback) {
        Author.delete({ id: event.pathParameters.id }, function (err) {
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
        if (data.name) {
            params.FilterExpression = "contains (#name, :name)";
            params.ExpressionAttributeNames = {
                "#name": "name",
            };
            params.ExpressionAttributeValues = {
                ":name": data.name || ' '
            };
        }

        Author.scan(params).exec()
            .then(function(rows) {
                callback(null, rows);
            });
    }
}
exports.AuthorService = AuthorService;
