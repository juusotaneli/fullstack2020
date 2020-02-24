describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kimmo',
      username: 'kipi',
      password: 'kipi'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })
  it('user can log in', function () {
    cy.get('#username').type('kipi')
    cy.get('#password').type('kipi')
    cy.get('#loginButton').click()
    cy.contains('logged in kipi')
  })
  it('login fails with wrong password', function () {
    cy.get('#username').type('esa')
    cy.get('#password').type('esa')
    cy.contains('login').click()
    cy.get('#loginButton').click()

    cy.contains('wrong')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})
describe('when logged in', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('kipi')
    cy.get('#password').type('kipi')
    cy.get('#loginButton').click()
  })
  it('a new blog can be created', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('Peer Gynt')
    cy.get('#author').type('Henrik Ibsen')
    cy.get('#urlComponent').type('www.gynt.com')
    cy.contains('add').click()

    cy.contains('a new blog Peer Gynt by Henrik Ibsen was added')

    cy.contains('view').click()
    cy.contains('www.gynt.com')
  })
  it('user can give a like to a blog and giving a like increses the number of likes', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('Peer Gynt')
    cy.get('#author').type('Henrik Ibsen')
    cy.get('#urlComponent').type('www.gynt.com')
    cy.contains('add').click()

    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('likes').contains('1')
  })
  it('user can delete a blog', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('Peer Gynt')
    cy.get('#author').type('Henrik Ibsen')
    cy.get('#urlComponent').type('www.gynt.com')
    cy.contains('add').click()

    cy.contains('view').click()

    cy.contains('delete').click()

    cy.contains('deleted')

  })
})
