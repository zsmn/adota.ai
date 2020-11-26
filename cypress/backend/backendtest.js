function makeRandom(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('Adota.ai Backend', function() {
    // bichinhos /get
    it('request bichinhos /get', () => {
      cy.request('https://adota-ai-backend.herokuapp.com/pet/')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).property('pets').to.have.property('length').and.be.greaterThan(0)
        })
        .its('body')
        .its('pets')
        .its('0')
        .then((pet) => {
          expect(pet).to.have.property('_id').and.to.be.a('string')
          expect(pet).to.have.property('photos').and.to.be.a('array')
          expect(pet).to.have.property('deleted').and.to.be.a('boolean')
          expect(pet).to.have.property('animalName').and.to.be.a('string')
          expect(pet).to.have.property('locality').and.to.be.a('string')
          expect(pet).to.have.property('sex').and.to.be.a('string')
          expect(pet).to.have.property('size').and.to.be.a('string')
          expect(pet).to.have.property('age').and.to.be.a('string')
          expect(pet).to.have.property('info').and.to.be.a('string')
          expect(pet).to.have.property('contact').and.to.be.a('string')
          expect(pet).to.have.property('userId').and.to.be.a('string')
          expect(pet).to.have.property('createdAt')
        })
    })

    // eventos /get
    it('request eventos /get', () => {
      cy.request('https://adota-ai-backend.herokuapp.com/event/')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).property('events').to.have.property('length').and.be.greaterThan(0)
        })
        .its('body')
        .its('events')
        .its('0')
        .then((event) => {
          expect(event).to.have.property('_id').and.to.be.a('string')
          expect(event).to.have.property('photos').and.to.be.a('array')
          expect(event).to.have.property('extraInfo').and.to.be.a('string')
          expect(event).to.have.property('generalInfo').and.to.be.a('string')
          expect(event).to.have.property('ownerContact').and.to.be.a('string')
          expect(event).to.have.property('deleted').and.to.be.a('boolean')
          expect(event).to.have.property('userId').and.to.be.a('string')
          expect(event).to.have.property('eventDate')
          expect(event).to.have.property('createdAt')
        })
    })

    /// registering user
    var login = makeRandom(6)
    var pass = makeRandom(6)
    var mail = makeRandom(20)
    it('registering ' + login + ':' + pass + ' mail: ' + mail, () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/register', failOnStatusCode: true,
        body:{
          username: login,
          password: pass,
          email: mail
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
      })
    })

    /// testing registered user with wrong pass
    var wrongPass = makeRandom(6)
    it('test wrong pass ' + login + ':' + wrongPass + ' (Invalid password)', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/authenticate', failOnStatusCode: false,
        body:{
          username: login,
          password: wrongPass
        }
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error').and.to.be.equal('Invalid password')
        expect(response.body).to.not.have.property('token')
      })
    })
  
    /// logging with registered user
    var logToken = ''
    it('login with ' + login + ':' + pass, () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/authenticate', failOnStatusCode: true,
        body:{
          username: login,
          password: pass
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
        expect(response.body).to.have.property('token')
        logToken = response.body.token
      })
    })

    /// requestUser route with registered user (check if everything is ok)
    it('requestUser route (check if result = ' + login + ')', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/requestuser', failOnStatusCode: true,
        body: { 
          token: 'Bearer ' + logToken
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
        expect(response.body.username).to.be.equal(login)
      })
    })

    /// registering bichinho
    var petId = ''
    it('register one bichinho', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/pet/register', failOnStatusCode: true, body: { 
        animalName: "Branquinho",
        locality: "Recife, PE",
        sex: "Macho",
        size: "Grande",
        age: "10 Anos",
        info: "Gente boa",
        contact: "4002 8922",
        photos: ["oi", "fon", "eae"]
      }, 
      headers: { 
        authorization: 'Bearer ' + logToken
      }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
        expect(response.body.pet).to.have.property('_id')
        petId = response.body.pet._id
      })
    })

    /// deleting bichinho
    it('delete one bichinho', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/pet/delete/' + petId, failOnStatusCode: true, 
      headers: { 
        authorization: 'Bearer ' + logToken
      }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    /// registering event
    var eventId = ''
    it('register one event', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/event/register', failOnStatusCode: true, body: { 
        eventDate: "2020-11-30",
        generalInfo: "Evento top",
        extraInfo: "Fiquei ate sem palavras",
        ownerContact: "4002 8922",
        photos: ["oi", "fon", "eae", "trab"]
      }, 
      headers: { 
        authorization: 'Bearer ' + logToken
      }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
        expect(response.body.event).to.have.property('_id')
        eventId = response.body.event._id
      })
    })

    /// deleting event
    it('delete one event', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/event/delete/' + eventId, failOnStatusCode: true, 
      headers: { 
        authorization: 'Bearer ' + logToken
      }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    /// deleting registered user
    it('deleting ' + login + ':' + pass, () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/delete', 
        headers: { 
          authorization: 'Bearer ' + logToken
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('error')
      })
    })
    
    /// checking if registered user is really deleted (user not found)
    it('test if ' + login + ':' + pass + ' is really deleted (User not found)', () => {
      cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/authenticate', failOnStatusCode: false,
        body:{
          username: login,
          password: pass
        }
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error').and.to.be.equal('User not found')
        expect(response.body).to.not.have.property('token')
      })
    })
})
