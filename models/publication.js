"use strict";

const dynamodb = require("aws-sdk/clients/dynamodb");
const uuid = require("uuid");
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
    accessKeyId : process.env.AWS_KEY_ID,
    secretAccessKey : process.env.AWS_KEY_SECRET,
    region : 'us-east-1'
});

const author = dynamoose.model('author', {
    id: String,
    name: String,
    email: String,
    birthday: String
});
const publication = dynamoose.model('publication', {
    id: String,
    authorId: String,
    title: String,
    body: String,
    date: String,
});

class PublicationService {

    constructor() {
        this.table = 'publication';
        this.pageLimit = 5;
        this.dynamoDb = new dynamodb.DocumentClient();
    }

    list(event, callback) {
        publication.scan().exec()
            .then(function(dogs) {
                return Promise.all(dogs.map(function(dog) {
                    return dog.populate({
                        path: 'authorId',
                        model: 'author'
                    });
                }));
            })
            .then(function(dogs) {
                callback(null, dogs);
                console.log(dogs);
            });
    }

    get(event, callback) {
        publication.get().exec()
            .then(function(dogs) {
                return Promise.all(dogs.map(function(dog) {
                    return dog.populate({
                        path: 'authorId',
                        model: 'author'
                    });
                }));
            })
            .then(function(dogs) {
                callback(null, dogs);
                console.log(dogs);
            });
    }

    create(event, callback) {
        const data = JSON.parse(event.body);
        data.id = uuid.v1();
        const params = {
            TableName: this.table,
            Item: data
        };
        return this.dynamoDb.put(params, (err) => {
            if (err) {
                callback(err);
            }
            callback(err, params.Item);
        });
    }

    update(event, callback) {
        const data = JSON.parse(event.body);
        data.id = event.pathParameters.id;
        const params = {
            TableName: this.table,
            Item: data
        };
        return this.dynamoDb.put(params, (err, data) => {
            if (err) {
                callback(err);
            }
            callback(err, params.Item);
        });
    }

    delete(event, callback) {
        const params = {
            TableName: this.table,
            Key: {
                id: event.pathParameters.id
            }
        };
        return this.dynamoDb.delete(params, (err, data) => {
            if (err) {
                callback(err);
            }
            callback(err, params.Key);
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

        publication.scan(params).exec()
            .then(function(dogs) {
                return Promise.all(dogs.map(function(dog) {
                    return dog.populate({
                        path: 'authorId',
                        model: 'author'
                    });
                }));
            })
            .then(function(dogs) {
                callback(null, dogs);
                console.log(dogs);
            });
    }
}

exports.PublicationService = PublicationService;
