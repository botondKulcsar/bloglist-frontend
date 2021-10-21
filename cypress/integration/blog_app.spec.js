describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').as('loginForm')
    cy.get('@loginForm').should('contain', 'username')
    cy.get('@loginForm').should('contain', 'password')
    cy.get('@loginForm').should('contain', 'login')
  })

})