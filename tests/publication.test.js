const request = require("supertest");
const uuid = require("uuid");

const baseUrl = "https://qh5otqm0t4.execute-api.us-east-1.amazonaws.com";
const stage = "/dev";
const model = "/publication";

let publication = {
    date: new Date(2000, 12, 31).toISOString(),
    title: `La Rosa de Guadalupe`,
    body: "Mexican novel about people's life events"
};
let author = {
    email: "johndoe@andlar.com",
    name: "John Doe",
    birthday: new Date(2000, 12, 31).toISOString()
};

describe(`GET ${model}`, () => {
    it("[200] succeeds to get list of publications", done => {
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
            .post(`/author`)
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
                publication.authorId = data.id;
                done();
            });
    });

    it("[200] succeeds to create a publication", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .post(`${model}`)
            .send(publication)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;

                const { data } = res.body;
                expect(data.id).not.toBe(publication.id);
                expect(data).toMatchObject({
                    ...publication,
                    id: data.id
                });
                publication = data;
                done();
            });
    });
});

describe(`GET ${model}/:id`, () => {
    it("[200] succeeds to get a publication", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .get(`${model}/${publication.id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;
                expect(res.body.data).toMatchObject({
                    ...publication,
                    authorId: author
                });
                done();
            });
    });

    it("[200] failed to get a publication", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .get(`${model}/fake-id`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).toBeUndefined;
                done();
            });
    });
});

describe(`PUT ${model}/:id`, () => {
    publication.title = `Guadalupe's Rose`;
    it("[200] succeeds to rename publication's title", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .put(`${model}/${publication.id}`)
            .send(publication)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).toMatchObject(publication);
                done();
            });
    });

    it("[403] failed to rename publication's title", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .put(`${model}/fake-id`)
            .send(publication)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end(() => done());
    });
});

describe(`GET ${model}/filter`, () => {
    it(`[200] succeeds to get publications with authorId "${author.id}"`, done => {
        request
            .agent(`${baseUrl}${stage}`)
            .post(`${model}/filter`)
            .send({ authorId: author.id })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.result).toBe(true);
                expect(res.body.data).not.toBeUndefined;
                expect(
                    res.body.data.filter(p => p.authorId.id === author.id).length > 0
                );
                done();
            });
    });
});

describe(`DELETE ${model}/:id`, () => {
    it("[200] succeeds to delete an publication", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .delete(`${model}/${publication.id}`)
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

    it("[403] failed to delete an publication", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .delete(`${model}/fake-id`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end(() => done());
    });
});

describe(`DELETE author/:id`, () => {
    it("[200] succeeds to delete an author", done => {
        request
            .agent(`${baseUrl}${stage}`)
            .delete(`/author/${author.id}`)
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
});
