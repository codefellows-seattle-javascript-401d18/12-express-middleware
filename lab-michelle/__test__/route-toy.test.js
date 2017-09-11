'use strict';
//if you see copied chunks in here, it's all from my lab 9

const Promise = require('bluebird');
const superagent = require('superagent');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
require('../lib/server').listen(3000);
require('jest');

describe('Testing the toy routes', function () {
  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid requests', () => {
        beforeAll(() => {
          return superagent.post(':3000/api/toy')
            .send({
              name: 'john',
              desc: 'voodoo doll',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
            });
        });
        test('should create and return a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object);
          expect(this.mockToy).toHaveProperty('name');
          expect(this.mockToy).toHaveProperty('desc');
          expect(this.mockToy).toHaveProperty('_id');
        });
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('voodoo doll');
        });
        test('should have name given a valid request', () => {
          expect(this.mockToy.name).toBe('john');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
        });
        test('should return 201 created given valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
      describe('Invalid Requests', () => {
        test('should have an error of 400', done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });
        });
        test('should have an error of 404 for a bad endpoint', done => {
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
    // GET ONE Requests//
    describe('GET one item by id requests', ()=> {
      describe('Valid requests', () => {
        test('should get a toy given a valid request', done => {
          superagent.get(`:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .then(res => {
              this.res = res;
              expect(res.body).toHaveProperty('name');
              expect(res.body).toHaveProperty('desc');
              expect(res.status).toBe(200);
              done();
            });
        });
      });
      describe('Invalid requests', () => {
        test('should not get a valid thing', function() {
          return superagent.get(`:3000/api/toy/1233`)
            .catch(res => {
              expect(res.status).toBe(500);
            });
        });
      });
      //GET MANY!//
      describe('GET all the items', ()=> {
        describe('Valid requests', () => {
          test('should get an array of toys given a valid request', done => {
            superagent.get(`:3000/api/toy/`)
              .type('application/json')
              .then(res => {
                this.res = res;
                expect(res.body).toBeInstanceOf(Array);
                done();
              });
          });
        });
        describe('Invalid requests', () => {
          test('should not get a valid thing', function() {
            return superagent.get(`:3000/api/toy/1233`)
              .catch(res => {
                expect(res.status).toBe(500);
              });
          });
        });
        //PUT REQs
        describe('PUT requests', ()=> {
          describe('Valid requests', () => {
          //if we send an id
            test('should create a return a new toy, given a valid request', done => {
              superagent.put(':3000/api/toy/:_id')
                .type('application/json')
                .send({
                  name: 'bob',
                  desc: 'stuffed turtle',
                })
                .then(res => {
                  this.res = res;
                  expect(this.res.body.name).toBe(204);
            })
            done();
            });
        });
        describe('Invalid requests', () => {
          test('should return a 500 error', done => {
            superagent.put(':3000/api/toy')
              .type('application/json')
              .send({})
              .then(res => {
                expect(res.status).ToBe(204);
              })
              .catch(err => {
                expect(err.status).ToBe(400);
              })
              done();
              });
          });
        });
      });
    });
    //DELETE requests
    describe('Delete requests', () => {
      describe('Valid requests', () => {
        beforeAll (done => {
          superagent.delete(`:3000/api/toy/${this.mockToy._id}`)
            .then (res => {
              this.resDelete = res;
              done();
            });
        });
        test('should return a 204 No Content', () => {
          expect(this.resDelete.status).toBe(204);
        });
      });
      describe('Invalid requests', ()=> {
        test('should return 404', done => {
          superagent.delete(':3000/api/toy')
            .query({_id: 'tabgobargblawrjg'})
            .catch(res => {
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });
  });
});
