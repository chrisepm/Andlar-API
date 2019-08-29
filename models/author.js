"use strict";

const dynamodb = require("aws-sdk/clients/dynamodb");
const uuid = require("uuid");

class AuthorService {

    constructor() {
        this.table = 'author';
        this.pageLimit = 5;
        this.dynamoDb = new dynamodb.DocumentClient();
    }

    list(event, callback) {
        const params = {
            TableName: this.table,
            ExclusiveStartKey: null,
        };

        return this.dynamoDb.scan(params, (err, data) => {
            if (err) {
                callback(err);
            }
            callback(err, data.Items);
        });
    }

    get(event, callback) {
        const params = {
            TableName: this.table,
            Key: {
                id: event.pathParameters.id
            }
        };
        return this.dynamoDb.get(params, (err, data) => {
            if (err) {
                callback(err);
            }
            callback(err, data.Item);
        });
    }

    create(event, callback) {
        const data = JSON.parse(event.body);
        data.id = uuid.v1();
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
        return this.dynamoDb.delete(params, (err) => {
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
        if (data.name) {
            params.FilterExpression = "contains (#name, :name)";
            params.ExpressionAttributeNames = {
                "#name": "name",
            };
            params.ExpressionAttributeValues = {
                ":name": data.name || ' '
            };
        }
        return this.dynamoDb.scan(params, (err, data) => {
            if (err) {
                callback(err);
            }
            callback(err, data);
        });
    }
}
exports.AuthorService = AuthorService;
