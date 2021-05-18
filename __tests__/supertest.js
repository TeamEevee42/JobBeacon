/* eslint-disable no-undef */
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Testing Routes', () => {
  describe('/jobs', () => {
    describe('GET', () => {
      xit('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));

      xit('jobs from "DB" json are in body of response', () => {
      });
    });

    describe('POST', () => {
      xit('responds with 200 status and application/json content type', () => {
      });

      xit('responds with the updated jobs list', () => {
      });

      xit('responds to invalid request with 400 status and error message in body', () => {
      });
    });
  });
});
