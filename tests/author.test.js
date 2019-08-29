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
            .agent(`${baseUrl}${stage}`)
            .get(`${model}`)
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
            .agent(`${baseUrl}${stage}`)
            .post(`${model}`)
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

describe(`GET ${model}/:id`, () => {
    it("[200] succeeds to get an author", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .get(`${model}/${author.id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;
                expect(res.body.data).toMatchObject(author);
                done();
            });
    });
    it("[403] failed to get an author", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .get(`${model}/fake-id`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end(() => done());
    });
});

describe(`PUT ${model}/:id`, () => {
    author.name = "John See";
    it("[200] succeeds to rename author's name", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .put(`${model}/${author.id}`)
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
            .agent(`${baseUrl}${stage}`)
            .put(`${model}/fake-id`)
            .send(author)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end(() => done());
    });
});

describe(`DELETE ${model}/:id`, () => {
    it("[200] succeeds to delete an author", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .delete(`${model}/${author.id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;
                expect(res.body.data).toBe(author.id);
                done();
            });
    });

    it("[403] failed to delete an author", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .delete(`${model}/fake-id`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end(() => done());
    });
});
