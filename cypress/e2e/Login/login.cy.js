import LoginPage from "../../page-objects/LoginPage"

describe('Teste de Cenário de Login', () => {
  
  beforeEach(() => {
    LoginPage.visit('/')
  })
  it('CT001 - Login com usuário "standard_user"', () => {
    cy.fixture('users').then(users => {
      LoginPage.fillUsername(users.standard_user.username)
      LoginPage.fillPassword(users.standard_user.password)
      LoginPage.clickLogin()
      cy.url().should('include', '/inventory')
    })
  })

  it('CT002 - Login com usuário "locked_out_user"', () => {
    cy.fixture('users').then(users => {
      LoginPage.fillUsername(users.locked_out_user.username)
      LoginPage.fillPassword(users.locked_out_user.password)
      LoginPage.clickLogin()
      LoginPage.userBlockedMessage()
    })
  });

  it('CT003 - Login com usuário "problem_user"', () => {
    cy.fixture('users').then(users => {
      LoginPage.fillUsername(users.problem_user.username)
      LoginPage.fillPassword(users.problem_user.password)
      LoginPage.clickLogin()
      cy.url().should('include', '/inventory')
    })
  });

  it('CT004 - Login com o usuário “standard_user” e senha incorreta.', () => {
    cy.fixture('invalidUsers').then(invalidUsers => {
      LoginPage.fillUsername(invalidUsers.standard_user.username)
      LoginPage.fillPassword(invalidUsers.standard_user.password)
      LoginPage.clickLogin()
      LoginPage.errorLoginMessage()
    })
  });

  it('CT005 - Login com o usuário “locked_out_user” e senha incorreta.', () => {
    cy.fixture('invalidUsers').then(invalidUsers => {
      LoginPage.fillUsername(invalidUsers.locked_out_user.username)
      LoginPage.fillPassword(invalidUsers.locked_out_user.password)
      LoginPage.clickLogin()
      LoginPage.errorLoginMessage()
    })
  });

  it('CT006 - Login com o usuário “problem_user” e senha incorreta.', () => {
    cy.fixture('invalidUsers').then(invalidUsers => {
      LoginPage.fillUsername(invalidUsers.problem_user.username)
      LoginPage.fillPassword(invalidUsers.problem_user.password)
      LoginPage.clickLogin()
      LoginPage.errorLoginMessage()
    })
  });
})