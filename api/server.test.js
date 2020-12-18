// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

/// CLEAN DB before running tests
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('users').truncate();
});


/// INITALIZE TESTING VALUES
const dummyUser = {
  username: "FrodoBaggins",
  password: "melon"
};

test('sanity', () => {
  expect(true).toBe(false);
});

/// testing api/auth/ endpoints 
describe('[POST] /register', () => {
  it('returns new user and hashed password', async () => {
    const res = await request(server).post('/users').send(dummyUser);
    expect(res.body.id).toBe(1);
    expect(res.body.username).toBe('FrodoBaggins');
    expect(res.body.password).not.toBe('melon');
  });
  it('make sure we cant register a username already in use', async () => {
    await request(server).post('/users').send(dummyUser);
    const res = await request(server).post('/users').send(dummyUser);
    expect(JSON.stringify(res.body)).toMatch(/username taken/);
  });
});