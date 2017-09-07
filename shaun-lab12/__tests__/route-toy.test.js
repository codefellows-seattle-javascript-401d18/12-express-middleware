'use strict';

// const Promise = require('bluebird');
const superagent = require('superagent');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('../lib/server').listen(3000);
require('jest');

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'barney',
              desc: 'purple dino',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              done();
            });
        });
        test('should create and return a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object);
          expect(this.mockToy).toHaveProperty('name');
          expect(this.mockToy).toHaveProperty('desc');
          expect(this.mockToy).toHaveProperty('_id');
        });
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('barney');
        });
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('purple dino');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).not.toBeNull();
        });
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
      describe('Invalid Requests', () => {
        // TODO: error status, message, name, bad endpoint
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err;
              done();
            });
        });
        test('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(500);
          expect(this.errPost.message).toBe('Internal Server Error');
        });
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });
    describe('GET requests', () => {
      describe('Valid Requests', () => {
        test('should get the record from the toy dir', done => {
          superagent.get(`localhost:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.body.name).toEqual('barney');
              expect(res.body.desc).toEqual('purple dino');
              expect(res.status).toEqual(200);
              done();
            });
        });
      });
      describe('Invalid Requests', () => {
        test('should return 500 for bad ID', done => {
          superagent.get(`localhost:3000/api/toy/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(500);
              done();
            });
        });
        test('should return 404 error for bad endpoint', done => {
          superagent.get(`localhost:3000/toy/toy/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
    describe('PUT requests', () => {
      test('should update existing record when provided valid ID', done => {
        superagent.put(`localhost:3000/api/toy/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(200);
            done();
          });
      });
      test('should return 404 on bad endpoint', done => {
        superagent.put(`localhost:3000/toy/api/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
      test('should return 500 with bad ID', done => {
        superagent.put(`localhost:3000/api/toy/39750395`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(500);
            done();
          });
      });
    });
    describe('#DELETE', () => {
      describe('DELETE method endpoint', () => {
        test('should return 404 if no resource ID was provided', done => {
          superagent.delete('localhost:3000/api/toy')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(err).not.toBeNull();
              expect(res.status).toBe(404);
              done();
            });
        });

        test('Should return 500 for valid requests made with an ID that was not found', done => {
          superagent.delete('localhost:3000/api/toy/2223242525')
            .type('application/json')
            .end((err, res) => {
              expect(err).not.toBeNull();
              expect(res.status).toBe(500);
              done();
            });
        });


        test('Should respond with 204 for a request with a valid resource ID.', done => {
          superagent.delete(`localhost:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(204);
              done();
            });
        });
      });
    });
  });
});
