function makeRandom(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var userName = makeRandom(7)
var password = makeRandom(5)
var email = makeRandom(15)

describe('Adota.ai Homepage', () => {
    it('Deve mostrar a página inicial do Adota.ai', () => {
        cy.visit("https://adota-ai.herokuapp.com/") 
    }) 
    it('Checar se o título da página inicial está correto', () => {
        cy.title().should('eq', 'Adota.ai')
    })

    it('Checar se todos os botões da página inicial estão presentes', () => {
        cy.contains('Adota.ai')
        cy.contains('Página Inicial')
        cy.contains('Bichinhos')
        cy.contains('Eventos')
        cy.contains('Login')
        cy.contains('Cadastro')
        cy.contains('Adote um Pet')
        cy.contains('Eventos')
        cy.contains('Por que adotar?')
        cy.contains('Dicas e cuidados')
        cy.contains('Sobre nós')
        cy.contains('FAQ')
        cy.contains('Termos de uso')
    })

    it('Checar se o id=cabeçalho, class=depoimentos, id=footer, class=back-to-top foram carregados na página', () => {
        cy.get('#cabecalho')
        cy.get('.depoimentos')
        cy.get('#footer')
        cy.get('.back-to-top')
    })
})

describe('Adota.ai Register/Login user', () => {
    it('Ir para a pagina de cadastro', () => {
        cy.visit("https://adota-ai.herokuapp.com/cadastro.html")
    })

    it('Cadastrar um usuário', () => {
        // typping data
        cy.get('#formUsuarios').find('#login').type(userName)
        cy.get('#formUsuarios').find('#email').type(email)
        cy.get('#formUsuarios').find('#password').type(password)

        // submit form
        cy.get('#formUsuarios').submit()

        // get success
        cy.get('.ajs-success')
    })

    it('Ir para a pagina de login', () => {
        cy.visit("https://adota-ai.herokuapp.com/login.html")
    })

    it('Logar o usuário cadastrado', () => {
        // typping data
        cy.get('#formLogin').find('#login').type(userName)
        cy.get('#formLogin').find('#password').type(password)

        // submit form
        cy.get('#formLogin').submit()

        // get success
        cy.get('.ajs-success')
    })
})

describe('Adota.ai Bichinho register', () => {
    beforeEach(() => {
        cy.visit("https://adota-ai.herokuapp.com/login.html")
        // typping data
        cy.get('#formLogin').find('#login').type(userName)
        cy.get('#formLogin').find('#password').type(password)

        // submit form
        cy.get('#formLogin').submit()

        // get success
        cy.get('.ajs-success')
    })

    it('Registrar um bichinho', () => {
        cy.visit("https://adota-ai.herokuapp.com/registro-animais.html")

        // typping data
        cy.get('#formAnimais').find('#nome-animal').type("BichinhoDummy")
        cy.get('#formAnimais').find('#localidade').type("Recife-PE")
        cy.get('#formAnimais').find('#sexo-animal').type("Macho")
        cy.get('#formAnimais').find('#porte-animal').type("Grande")
        cy.get('#formAnimais').find('#idade-animal').type("10 Anos")
        cy.get('#formAnimais').find('#extra-info-animal').type("Muito dócil")
        cy.get('#formAnimais').find('#contato-animal').type("4002 8922")

        // submit form
        cy.get('#formAnimais').submit()

        // get success
        cy.get('.ajs-success')
    })
})

describe('Adota.ai Event register', () => {
    beforeEach(() => {
        cy.visit("https://adota-ai.herokuapp.com/login.html")
        // typping data
        cy.get('#formLogin').find('#login').type(userName)
        cy.get('#formLogin').find('#password').type(password)

        // submit form
        cy.get('#formLogin').submit()

        // get success
        cy.get('.ajs-success')
    })

    it('Registrar um evento', () => {
        cy.visit("https://adota-ai.herokuapp.com/registro-eventos.html")

        // typping data
        cy.get('#formEventos').find('#data-evento').type("2020-11-11")
        cy.get('#formEventos').find('#info-geral').type("Vai ser massa")
        cy.get('#formEventos').find('#info-extra').type("Fiquei ate sem palavras")
        cy.get('#formEventos').find('#contato-evento').type("4002 8922")

        // submit form
        cy.get('#formEventos').submit()

        // get success
        cy.get('.ajs-success')
    })
})

describe('Adota.ai Removing Registered User (with backend route)', () => {
    /// loging in backend to get token
    var logToken = ''
    it('login with ' + userName + ':' + password, () => {
        cy.request({method: 'POST', url: 'https://adota-ai-backend.herokuapp.com/auth/authenticate', failOnStatusCode: true,
            body:{
            username: userName,
            password: password
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.have.property('error')
            expect(response.body).to.have.property('token')
            logToken = response.body.token
        })
    })

    /// deleting registered user
    it('deleting ' + userName + ':' + password, () => {
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
})
