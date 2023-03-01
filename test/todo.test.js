const request = require('supertest');
const assert = require('assert');
const express = require('express');

const todoRouter = require('../routes/todo');

const app = express();

app.use(express.json());
app.use('/todo', todoRouter);
describe('Todos API', () => {

  describe('GET /', () => {
    it('should return the list of todos', (done) => {
      request(app)
        .get('/todo')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          assert.deepEqual(res.body, [
            {
              id: '1',
              text: 'todo 1',
              isCompleted: false,
              createdAt: '2019-01-01',
            },
          ]);
          done();
        });
    });
  });

  describe('GET /todo/:state', () => {
    it('should return the list of active todos', (done) => {
      request(app)
        .get('/todo/active')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          assert.deepEqual(res.body, [
            {
              id: '1',
              text: 'todo 1',
              isCompleted: false,
              createdAt: '2019-01-01',
            },
          ]);
          done();
        });
    });
  
    it('should return the list of completed todos', (done) => {
      request(app)
        .get('/todo/completed')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          assert.deepEqual(res.body, []);
          done();
        });
    });

    it('should return the list of all todos', (done) => {
      request(app)
        .get('/todo')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          assert.deepEqual(res.body, [
            {
              id: '1',
              text: 'todo 1',
              isCompleted: false,
              createdAt: '2019-01-01',
            },
          ]);
          done();
        });
    });
  });

  describe('POST /todo', () => {
    it('should create a new todo', (done) => {
      let id = '';
      request(app)
        .post('/todo')
        .send({ text: 'new todo' })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          assert.equal(res.body.length, 2);
          assert.equal(res.body[1].text, 'new todo');
          assert.equal(res.body[1].isCompleted, false);
          id = res.body[1].id;
          // done();
          request(app)
          .delete('/todo/' + id)
          .expect(200)
          .end((err, res) => {
              if (err) {
                done(err);
                return;
              }
              done();
            }
          );
        })
        
    });
  });

  describe('POST /todo/:id', () => {
    it('should update an existing todo', (done) => {
      request(app)
        .post('/todo/1')
        .send({ text: 'updated todo', isCompleted: true })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].text, 'updated todo');
          assert.equal(res.body[0].isCompleted, true);
          done();
        });
    });
  });

  describe('PATCH /todo/:id', () => {
    it('should update an existing todo', (done) => {
      request(app)
        .patch('/todo/1')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].text, 'updated todo');
          assert.equal(res.body[0].isCompleted, false);
          done();
        })
    });
  });

  describe('DELETE /todo/:id', () => {
    it('should delete an existing todo', (done) => {
      request(app)
        .delete('/todo/1')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.body.length, 0);
          done();
        });
    });
  });
});
