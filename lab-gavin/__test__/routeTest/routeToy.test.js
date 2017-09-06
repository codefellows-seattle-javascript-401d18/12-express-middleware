const server = require('../../lib/server');
const superagent = require('superagent');

describe('#ROUTE-TOY-TEST', function() {
  beforeAll(done => server.listen(3000, done));
  afterAll((done) => {
    server.close(() => done());
  });

  describe('#BAD call', () => {
    describe('No possible endpoint', () => {
      xtest('should return 404 when user tries an unregistered route', done => {
        superagent.post('/toy/api')
          .set('Content-Type', 'application/json')
          .send({})
          .end((err, res) => {
            // console.error(err);
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();

          });
      });
    });
  });

  describe('#POST', () => {
    describe('POST method, endpoint', () => {
      test('should return 400 when user inputs invalid url call', done => {
        superagent.post('localhost:3000/api/toy')
          .set('Content-Type', 'application/json')
          .send({})
          .end((err, res) => {
            // console.error(err);
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();

          });
      });

      test('Should return 201 and name/desc of toy user posted', done => {
        superagent.post(':3000/api/toy')
          .type('application/json')
          .send({
            name: 'PowerRanger',
            desc: 'Totally Awesome Red Ranger',
          })
          .end((err, res) => {
            if(err) console.error(err);

            this.toy = JSON.parse(res.text);
            this.aNewID = res.body._id;
            expect(this.toy.name).toEqual('PowerRanger');
            expect(this.toy.desc).toEqual('Totally Awesome Red Ranger');
            expect(res.status).toEqual(201);
            done();
          });
      });
      test('Should return 400 when not provding both name/desc', done => {
        superagent.post('localhost:3000/api/toy')
          .type('application/json')
          .send({
            desc: 'Totally Awesome Red motherfucking Ranger',
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
  });

  // console.log(this.toy);
  describe('#GET', () => {
    describe('GET method endpoint', () => {
      test('should return 400 when user requests with an invalid or not found ID', done => {
        // console.log(this.toy);
        superagent.get('localhost:3000/api/toy/3875983795')
          .type('application/json')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(500);
            done();
          });
      });

      test('Should return 200 if no ID was provided with all ids available', done => {
        superagent.get('localhost:3000/api/toy')
          .query({'_id': ' '})
          .end((err, res) => {
            expect(res.status).toEqual(200);
            done();
          });
      });

      test('Should return user with toy information from an ID', done => {
        superagent.get(`localhost:3000/api/toy/${this.toy._id}`)
          // .query({'_id': this.toy._id})
          .type('application/json')
          .end((err, res) => {
            expect(res.body.name).toEqual('PowerRanger');
            expect(res.body.desc).toEqual('Totally Awesome Red Ranger');
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
  });



  describe('#PUT', () => {
    describe('PUT method endpoint', () => {
      test('should return 404 if no request body or bad request body', done => {
        superagent.put('localhost:3000/api/toy')
          .set('Content-Type', 'text/plain')
          .query({'_id': ''})
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();
          });
      });

      test('should return 404 if no request body or bad request body', done => {
        superagent.put('localhost:3000/api/toy')
          .set('Content-Type', 'text/plain')
          .query({'_id': this.toy._id + 1})
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();
          });
      });

      test('Should respond with 204 with a valid body', done => {
        superagent.put(`localhost:3000/api/toy/${this.toy._id}`)
          // .query({'_id': this.toy._id})
          .send({
            'name': 'PowerRangerBlueToesAndEars',
            'desc': 'Totally Awesome Redefined Red Ranger',
            // '_id': this.toy._id,
          })
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(204);
            done();
          });
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
        superagent.delete(`localhost:3000/api/toy/${this.aNewID}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(204);
            done();
          });
      });
    });
  });
});
