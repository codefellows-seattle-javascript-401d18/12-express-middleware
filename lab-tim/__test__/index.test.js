'use strict';

const index = require('../index.js');
const superagent = require('superagent');

// superagent request:
// superagent.get(':3000/api/toy/1234-5678')
// .then(...)
// .catch(...)

describe('Testing the index file', function () {
  afterAll((done) => {
    index.close(done);
  });

  describe('POST  method', () => {
    test('POST on /api/toy endpoint - should return status code 201 and response', done => {
      superagent.post('localhost:3000/api/toy')
        .send({name: 'slinky', desc: 'metal'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(201);
          expect(res.body.name).toEqual('slinky');
          expect(res.body.desc).toEqual('metal');
          done();
        });
    });

    test('POST on /api/toy endpoint - should return status code 400', done => {
      superagent.post('localhost:3000/api/toy')
        .send({desc: 'orange'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
  });

  describe('PUT method', () => {
    test('PUT on /api/toy endpoint - should return status code 204 and response', done => {
      superagent.put('localhost:3000/api/toy')
        .send({_id: '2efd43c5-cc5c-4671-8539-a09bb8780580', name: 'slinky', desc: 'metal'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(204);
          done();
        });
    });

    test('PUT on /api/toy endpoint - should return status code 400', done => {
      superagent.put('localhost:3000/api/toy')
        .send({name: 'slinky', desc: 'metal'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
  });

  describe('GET method', () => {
    test('GET on /api/toy endpoint - should return status code 200 and response', done => {
      superagent.get('localhost:3000/api/toy/2efd43c5-cc5c-4671-8539-a09bb8780580')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.name).toEqual('slinky');
          expect(res.body.desc).toEqual('metal');
          done();
        });
    });

    test('GET on /api/toy endpoint - should return status code 404', done => {
      superagent.get('localhost:3000/api/toy/some-invalid-id-string')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });

    test('GET on /api/toy endpoint - should return status code 400', done => {
      superagent.get('localhost:3000/api/toy/some-invalid-id-string-id-string')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  describe('DELETE method', () => {
    test('DELETE on /api/toy endpoint - should return status code 204', done => {
      superagent.delete('localhost:3000/api/toy/some-id-string')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(204);
          done();
        });
    });

    test('DELETE on /api/toy endpoint - should return status code 400', done => {
      superagent.delete('localhost:3000/api/toy?name=some-id-string')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });

    test('DELETE on /api/toy endpoint - should return status code 404', done => {
      superagent.delete('localhost:3000/api/toy?_id=some-other-id-string')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          done();
        });
    });
  });
});
