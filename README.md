# Andlar API

This is the API based on [Node.js](https://nodejs.org) which utilizes several libraries such as:

* `serverless`
* `aws-sdk`
* `dynamodb`

## Quick Start
1. First of all, we need to make sure that all prerequisites are installed in order to run the server. Begin installing the following items:

 - [Node.js](https://nodejs.org)
 - [npm.js](https://www.npmjs.com/get-npm)
 - [jest.js](https://jestjs.io)

2. After this components and tools are installed, we need to checkout the code from repository: [https://github.com/chrisepm/andlar-api](https://github.com/chrisepm/andlar-api).
3. Go to the root folder which is where <b>server.js</b> and <b>package.json</b> file are, then download all dependencies included running the command:

    ```sh
    npm install
    ```

    This command should download and install all current dependencies:

    ```text
    aws-sdk      2.518.0
    uuid         3.3.3
    supertest    4.0.2
    ```

4. Finally, go to root folder and execute the command below to deploy the service.:

    ```sh
    sls deploy
    ```

## How to use the API

The following examples can be executed using [Postman](https://www.getpostman.com/) tool as client.
Some of the `GET`actions that are included in the API can be executed directly in a common browser such as <b>Google Chrome</b>.

Body content or parameters for all POST actions called from the client, should be in the form of <b>json</b> or <b>x-www-form-urlencoded</b> format.

The endpoints should be like this:

  - POST - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author
  - GET - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author
  - GET - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author/{id}
  - PUT - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author/{id}
  - DELETE - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author/{id}
  - POST - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/author/filter
  - POST - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication
  - GET - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication
  - GET - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication/{id}
  - PUT - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication/{id}
  - DELETE - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication/{id}
  - POST - https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com/dev/publication/filter

