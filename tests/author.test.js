const request = require("supertest");

const baseUrl = "https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com";
const stage = "/dev";
const model = "/author";
let author = {
    email: "johndoe@andlar.com",
    name: "John Doe",
    birthday: new Date(2000, 12, 31).toISOString()
};

describe(`GET ${model}`, () => {
    it("[200] succeeds to get list of authors", done => {
        request
            .agent(baseUrl)
            .get(`${stage}${model}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;
                done();
            });
    });
});

describe(`POST ${model}`, () => {
    it("[200] succeeds to create author", done => {
        request
            .agent(baseUrl)
            .post(`${stage}${model}`)
            .send(author)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;

                const { data } = res.body;
                expect(data.id).not.toBe(author.id);
                expect(data).toMatchObject({
                    ...author,
                    id: data.id
                });
                author = data;
                done();
            });
    });
});

describe(`PUT ${model}`, () => {
    author.name = "John See"
    it("[200] succeeds to rename author's name", done => {
        request
            .agent(baseUrl)
            .put(`${stage}${model}/${author.id}`)
            .send(author)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).toMatchObject(author);
                done();
            });
    });

    it("[403] failed to rename author's name", done => {
        request
            .agent(baseUrl)
            .put(`${stage}${model}/fake-id`)
            .send(author)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403).end(() => done());
    });
});
