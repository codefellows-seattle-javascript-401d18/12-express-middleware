'use strict';

const Promise = require('bluebird');
const superagent = require('supergent');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('../../lib/server').listen(3000);
require('jest');

describe('testing toy routes', function() {
  describe('all requests to api/toy'), () => {
    describe('POST requests', () => {
      describe('Valid requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'trollking',
              desc: 'ragey and trolllike'
            })
            .then(res => {
              this.mockToy = res.bod;
              this.resPost = res;
              done();
            });
        });

        test('should create a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object);
          expect(this.mockToy).toHaveProperty('name');
          expect(this.mockToy).toHaveProperty('desc');
          expect(this.mockToy).toHaveProperty('_id');

        });

        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('trollking');
        });

        test('should have  desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('ragey and trolllike');
        });

        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
        });

        test('should return a 201 Created, given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });

      describe('Invalid requests', () => {
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
          expect(this.errPost.status).toBe(400);
          expect(this.errPost.message).toBe('Bad Request');
        });

        test('should return 404 on invalid endpoint', done => {
          superagent(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });

    xdescribe('GET requests', () => {
      test('should get the record from the toy dir', done => {

        done();
      });
    });
    xdescribe('PUT requests', () => {
      test('should have a valid PUT request', done => {

        done();
      });
    });

    describe('DELETE requests', () => {
      describe('Valid request', () => {
        beforeAll(done => {
          superagent.delete(`:3000/api/toy/${this.mocktoy._id}`)
            .then(res => {
              this.resDelete = res;
              done();
            });
        });
        test('should return a 204 No Content', () => {
          expect(this.resDelete.status).toBe(204);
        });

        test('should remove the record from the toy dir', done => {
          fs.readdirProm(`${__dirname}/../../data/toy`)
            .then(files => {
              let expectedFalse = files.includes(`${this.mockToy._id}.json`);
              expect(expectedFalse).toBeFalsy();
              done();
            });
        });
      });
      describe('Invalid Request', () => {

      });
    });
  };
});
