const supertest = require("supertest");
var request = require('supertest');
const app = require('../../src/app.js');

describe("GET /genres", function() {
  it("it should has status code 200", function() {
    supertest(app)
      .get("/genres")
      .expect(200)
      
  });
});

describe("GET /videogame/:ID", function() {
  it("it should has status code 200", function() {
    supertest(app)
      .get("/videogame/11")
      .expect(200)
     
  });
});

describe("GET /videogames?name=", function() {
  it("it should has status code 200",  function() {
    supertest(app)
      .get("/videogames?name=sonic")
      .expect(200)
      
  });
});

describe("GET /wrong page", function() {
  it("it should has status code 404", function() {
    supertest(app)
      .get("/genr")
      .expect(404)
      
  });
});

describe("POST /videogame", function() {
  it('should respond with status 200', function() {
    request(app)
      .post('/videogame')
      .send('Videojuego Creado')
      .expect(200)
      
  });
});
