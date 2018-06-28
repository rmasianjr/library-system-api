const request = require('supertest');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { User } = require('../models/User');
const app = require('../app');

let server;

describe('/api/users', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/library_db_test');
    server = app.listen(3001);
  });

  afterAll(async () => {
    await Promise.all([mongoose.connection.close(), server.close()]);
  });

  afterEach(async () => {
    await User.remove({});
  });

  describe('POST /', () => {
    let username;
    let email;
    let password;
    let existingUser;

    const run = () => {
      return request(server)
        .post('/api/users')
        .send({ username, email, password });
    };

    beforeEach(async () => {
      existingUser = new User({
        username: 'existing user',
        email: 'test@existing.com',
        password: '123456'
      });
      await existingUser.save();

      username = 'test user';
      email = 'test@newmail.com';
      password = 'password';
    });

    it('should save the user if it is valid', async () => {
      await run();

      const user = await User.findOne({ email });

      expect(user).not.toBeNull();
    });

    it('should save the hashed password instead of plain password', async () => {
      await run();

      const user = await User.findOne({ email });

      expect(user.password).not.toBe(password);
    });

    it('should return the user if it is valid', async () => {
      const res = await run();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('username', username);
      expect(res.body).toHaveProperty('email', email);
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 400 if username is invalid', async () => {
      username = '';

      const res = await run();

      expect(res.status).toBe(400);
    });

    it('should return 400 if the email is invalid', async () => {
      email = 'invalidEmail';

      const res = await run();

      expect(res.status).toBe(400);
    });

    it('should return 400 if email is already exists', async () => {
      email = existingUser.email;

      const res = await run();

      expect(res.status).toBe(400);
    });

    it('should return 400 if the password is invalid', async () => {
      password = '12345';

      const res = await run();

      expect(res.status).toBe(400);
    });
  });
});
