describe('Authentication', () => {
  it('registers a user', () => {
    cy.visit('/register')
    cy.get('[name="username"]')
      .type('TestUser')
    cy.get('[name="email"]')
      .type('test@test.com')
    cy.get('[name="password1"]')
      .type('testing1234')
    cy.get('[name="password2"]')
      .type('testing1234')
    cy.get('.jss1351')
      .click({ multiple: true })
    cy.contains('Aland Islands')
      .click()
    cy.get('[type="submit"]')
      .click()

    cy.contains('You have successfully registered.')
  })

  it('logs out', () => {
    cy.visit('/logout')
  })

  it('logs in', () => {
    cy.visit('/login')
    cy.get('[name="username"]')
      .type('TestUser')
    cy.get('[name="password"]')
      .type('testing1234')
    cy.get('[type="submit"]')
      .click()
  })
})
