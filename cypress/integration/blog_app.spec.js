describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create a new user
    const user = {
      name: 'Cypress Hill',
      username: 'cypresshill',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('form').as('loginForm')
    cy.get('@loginForm').should('contain', 'username')
    cy.get('@loginForm').should('contain', 'password')
    cy.get('@loginForm').should('contain', 'login')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypresshill')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.get('p').should('contain', 'login successful')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypresshill')
      cy.get('#password').type('0000')
      cy.get('#login-button').click()
      cy.get('p')
        .should('contain', 'wrong username or password')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'cypresshill', password: '1234' })
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('first cypress blog')
        cy.get('#author').type('Cypress Hill')
        cy.get('input[type=url]').type('http://www.cypress-hill.com/blog')
        cy.get('button[type=submit]').click()

        cy.contains('first cypress blog Cypress Hill')
        cy.get('button').contains('view')
      })

    })

  })

})