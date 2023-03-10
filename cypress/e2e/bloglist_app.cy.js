describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('http://localhost:3000')

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'root', password: 'password', name: 'TestUser'
    })
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

        it('A blog can be deleted', function () {
          cy.contains('title author')
            .contains('view')
            .click()

          cy.contains('remove').click()

          cy.contains('title author').should('not.exist')
        })

        it('Another user cannot see the remove button', function () {
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
            username: 'OtherUser', password: 'password', name: 'OtherTestUser'
          })

          cy.login({ username: 'OtherUser', password: 'password' })

          cy.contains('title author')
            .contains('view')
            .click()

          cy.contains('remove').should('not.exist')
        })

        describe('and several blogs exist', function () {
          beforeEach(function () {
            cy.login({ username: 'root', password: 'password' })
            cy.createBlog(
              { title: 'Blog with the least likes', author: 'author', url: 'url' }
            )
            cy.createBlog(
              { title: 'Blog with the most likes', author: 'author', url: 'url' }
            )
          })

          it('the sort buttons orders with most likes first', function () {

            cy.contains('Blog with the most likes')
              .contains('view')
              .click()

            cy.contains('Blog with the most likes')
              .parent()
              .find('.likeButton')
              .click()
              .click()

            cy.contains('title author')
              .contains('view')
              .click()

            cy.contains('title author')
              .parent()
              .find('.likeButton')
              .click()

            cy.wait(1000)
            cy.contains('sort').click()

            cy.get('.blog').eq(0).should('contain', 'Blog with the most likes')
            cy.get('.blog').eq(1).should('contain', 'title author')
            cy.get('.blog').eq(2).should('contain', 'Blog with the least likes')

          })
        })

      })
    })
  })
})