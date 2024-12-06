import LoginPage from "../../page-objects/LoginPage"

describe('Teste de Cenário de Login', () => {
  
  beforeEach(() => {
    LoginPage.visit('/')
  })
  it('CT001 - Login com usuário "standard_user"', () => {
    LoginPage.fillUsername('standard_user')
    LoginPage.fillPassword('secret_sauce')
    LoginPage.clickLogin()
    cy.url().should('include', '/inventory')
  })

  it('CT002 - Login com usuário "locked_out_user"', () => {
    LoginPage.fillUsername('locked_out_user')
    LoginPage.fillPassword('secret_sauce')
    LoginPage.clickLogin()
    LoginPage.userBlockedMessage()
  });

  it('CT003 - Login com usuário "problem_user"', () => {
    LoginPage.fillUsername('problem_user')
    LoginPage.fillPassword('secret_sauce')
    LoginPage.clickLogin()
    cy.url().should('include', '/inventory')
  });

  it('CT004 - Login com o usuário “standard_user” e senha incorreta.', () => {
    LoginPage.fillUsername('standard_user')
    LoginPage.fillPassword('wrong_password')
    LoginPage.clickLogin()
    LoginPage.errorLoginMessage()
  });

  it('CT005 - Login com o usuário “locked_out_user” e senha incorreta.', () => {
    LoginPage.fillUsername('locked_out_user')
    LoginPage.fillPassword('wrong_password')
    LoginPage.clickLogin()
    LoginPage.errorLoginMessage()
  });

  it('CT006 - Login com o usuário “problem_user” e senha incorreta.', () => {
    LoginPage.fillUsername('problem_user')
    LoginPage.fillPassword('wrong_password')
    LoginPage.clickLogin()
    LoginPage.errorLoginMessage()
  });
})