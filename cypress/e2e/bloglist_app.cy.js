describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('http://localhost:3000')

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'root', password: 'password', name: 'TestUser'
    })

    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.contains('login').click()

      cy.contains('TestUser is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('pass')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'password' })
        cy.visit('')
      })

      it('A blog can be created', function () {
        cy.contains('create').click()
        cy.get('#titleInput').type('title')
        cy.get('#authorInput').type('author')
        cy.get('#urlInput').type('url')

        cy.get('#blog-submit-button').click()

        cy.contains('title')
      })

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.login({ username: 'root', password: 'password' })
          cy.createBlog({ title: 'title', author: 'author', url: 'url' })
        })

        it('A blog can be liked', function () {


          cy.contains('title author')
            .contains('view')
            .click()

          cy.contains('like').click()

          cy.contains('likes')
            .contains('1')
        })
      })


    })
  })
})