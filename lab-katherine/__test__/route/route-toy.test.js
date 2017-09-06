'use strict'

const server = require('../../lib/server.js')
const superagent = require('superagent')

describe('testing toy routes', function(){
  beforeAll(done => server.listen(3000, done))
  afterAll((done) => {
    server.close(() => done())
  })

  //NOTE: passed and failed!
  describe('no endpoint', () => {
    test('return 404 if routes not registered', done => {
      superagent.post(':3000/api/death')
        .set('Content-Type', 'application/json')
        .send({})
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(404)
          done()
        })
    })
  })

  describe('all requests to /api/toy', () => {

    describe('#POST method', () => {
      //NOTE:
      test.only('201 should create and return a new toy, given a valid request', done => {
        superagent.post(':3000/api/toy')
          .type('application/json')
          .send({
            name: 'barney',
            desc: 'purple dino'
          })
          .end(res => {
            //can do text or body maybe
            console.log('body', res)
            // let mockToy = JSON.parse(res.body)
            expect(res.status).toEqual(201)
            console.log('after the res statut')
            expect(res.body.name).toEqual('bernie')
            console.log('after the body')
            expect(res.body.desc).toEqual('purple dino')
            console.log('after the res desc')
            expect(res.body).toHaveProperty('_id')
            // done()
          })
        done()
      })
      test('400 should respond with "bad request" if no request body was provided or the body was invalid', done => {
        superagent.post(':3000/api/toy')
          .type('application/json')
          .send({
            desc: 'please stop'
          })
          .end((err, res) => {
            // this.mockToy = res.body
            expect(res.status).toBe(200)
            done()
          })
        done()
      })

    })

    describe('#GET method', () => {
      test('404 should respond with "not found" for valid requests made with an id that was not found', done => {
        superagent.get(':3000/api/toy')
          .query({'_id': '5885'})
          .type('application/json')
          .end(res => {
            expect(res.status).toBe(404)
            done()
          })
        done()
      })
      test('400 should respond with bad request if no id', done => {
        superagent.get(':3000/api/toy')
          .query({'_id': ''})
          .end(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('200 should contain a response body for a request made with a valid id', done => {
        superagent.get(':3000/api/toy')
          .type('application/json')
          .query({'_id': 'aaab23a2-a5c1-4e77-b740-bb9e48da436e'})
          .end(res => {
            expect(res.body.name).toEqual('barney')
            expect(res.body.desc).toEqual('purple dino')
            expect(res.status).toEqual(200)
            done()
          })
        done()
      })
    })

    describe('#PUT method', () => {
      test('400 should respond with "bad request" if no request body was provided or the body was invalid', done => {
        superagent.put(':3000/api/toy')
          .type('text/plain')
          .query({'_id': ''})
          .end(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('204 should respond with no body content for a put request with a valid body', done => {
        superagent.put(':3000/api/toy')
          .query({'_id': '50d053d1-df2c-4101-b07b-09a6b546e848'})
          .send({
            'name': 'better barney',
            'desc': 'better purple dino',
            '_id': '50d053d1-df2c-4101-b07b-09a6b546e848'
          })
          .type('application/json')
          .end(res => {
            expect(res.status).toEqual(204)
            done()
          })
        done()
      })
    })

    describe('#DELETE method', () => {
      test('400 should respond with "bad request" if no resource id was provided', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': ''})
          .end(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('404 should respond with "not found" for valid requests made with an id that was not found', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': '5885'})
          .end(res => {
            expect(res.status).toEqual(404)
            done()
          })
        done()
      })
      test('204 should respond with no body content for a request request with a valid resource id', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': '8034ccf9-9bfd-4ffb-877c-cf159fdbedcd'})
          .end(res => {
            expect(res.status).toEqual(204)
            done()
          })
        done()
      })
    })
  })
})
