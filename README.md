# SauceDemo Automation Project

Este repositório contém automações desenvolvidas para o site [SauceDemo](https://www.saucedemo.com/) com o objetivo de aprendizado em testes automatizados.
## Descrição

Este projeto utiliza Cypress para automatizar testes de funcionalidades do site SauceDemo. As automações incluem testes de login, navegação da loja, manipulação do carrinho de compras e finalização de compra.

## Estrutura do Projeto

- **cypress/**
  - **e2e/**
    - **Checkout/**
      - `checkout.cy.js`: Testes de finalização de compra.
    - **Login/**
      - `login.cy.js`: Testes de cenários de login.
    - **Navigation/**
      - `navigation.cy.js`: Testes de navegação da loja.
    - **shoppingCart/**
      - `shoppingcart.cy.js`: Testes de manipulação do carrinho de compras.
  - **fixtures/**: Contém arquivos de dados fixos usados nos testes.
  - **page-objects/**: Contém as classes de página (Page Object Model) usadas para organizar as ações da interface.
    - `checkoutPage.js`
    - `LoginPage.js`
    - `NavigationPage.js`
    - `shoppingCartPage.js`
  - **support/**: Contém comandos personalizados e configurações.
- **node_modules/**
- `.gitignore`
- `cypress.config.js`
- `package-lock.json`
- `package.json`
- `README.md`

## Pré-requisitos

- Node.js (v12 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone este repositório para o seu ambiente local:
   ```sh
   git clone https://github.com/SeuUsuario/SeuRepositorio.git

2. Navegue até o diretório do projeto:
   ```sh	
   cd SeuRepositorio
   ````

3. Instale as dependências:
   ```sh
   npm install
   ````

## Executando os Testes
Para executar os testes, você pode usar os seguintes comandos:

1. Abrir a Interface do Cypress
   ```sh
   npx cypress open
   ````
2. Executar os Testes no Modo Headless
   ```sh	
   npx cypress run
   ````

# Estrutura dos Testes
## Testes de Login
``` javascript
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
````
## Testes de Navegação da Loja

```javascript
import NavigationPage from "../../page-objects/NavigationPage";
import LoginPage from "../../page-objects/LoginPage";

describe('Teste de navegação da loja', () => {

    beforeEach(() => {
        LoginPage.visit('/')
        LoginPage.login('standard_user', 'secret_sauce')
    })

    it('CT001 - Verificar se a página inicial exibe pelo menos 6 produtos ao carregar.', () => {
        
        NavigationPage.countItems()
    });

    it('CT002 - Aplicar o filtro de produtos “Low to High” e verificar se os produtos são exibidos em ordem de preço crescente', () => {
       
        NavigationPage.productSortContainer()
        NavigationPage.inventoryItemPrice()
    });

    it('CT003 - Clicar em um produto e verificar se o produto correspondente aparece no resultado.', () => {

        const productSelector = '[data-test="item-4-title-link"]'
        const expectedProductName = 'Sauce Labs Backpack'
        
        NavigationPage.productClick(productSelector, expectedProductName)
    });

    
});
````

## Testes de Carrinho de Compras

```javascript
import ShoppingCartPage from "../../page-objects/ShoppingCartPage";
import LoginPage from "../../page-objects/LoginPage";


describe('Carrinho de Compras', () => {

    beforeEach(() => {
        ShoppingCartPage.visit('/')
        LoginPage.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory')
    })

    it('CT001 - Adicionar um produto ao carrinho e verificar se o carrinho exibe o produto adicionado.', () => {
        const productSelector = "[data-test='add-to-cart-sauce-labs-backpack']";
        const expectedProductName = 'Sauce Labs Backpack';

        ShoppingCartPage.addProduct(productSelector)
        ShoppingCartPage.openCart()
        cy.url().should('include', '/cart')
        ShoppingCartPage.verifyProductInCart(expectedProductName)
    });

    it('CT002 - Adicionar múltiplos produtos ao carrinho e confirmar se todos estão listados.', () => {
        const products = [
            { selector: "[data-test='add-to-cart-sauce-labs-backpack']", name: 'Sauce Labs Backpack'},
            { selector: "[data-test='add-to-cart-sauce-labs-bike-light']", name: 'Sauce Labs Bike Light'},
            { selector: "[data-test='add-to-cart-sauce-labs-bolt-t-shirt']", name: 'Sauce Labs Bolt T-Shirt'}
        ]; 

        products.forEach(product => {
            ShoppingCartPage.addProduct(product.selector)
        });

        ShoppingCartPage.openCart()
        cy.url().should('include', '/cart')

        products.forEach(product => {
            ShoppingCartPage.verifyProductInCart(product.name)
        });
    });

    it('CT003 - Remover um produto do carrinho e verificar se o total é atualizado corretamente.', () => {
        const products = [
            { selector: "[data-test='add-to-cart-sauce-labs-backpack']", name: 'Sauce Labs Backpack', removeSelector: "[data-test='remove-sauce-labs-backpack']" },
            { selector: "[data-test='add-to-cart-sauce-labs-bike-light']", name: 'Sauce Labs Bike Light', removeSelector: "[data-test='remove-sauce-labs-bike-light']"},
            { selector: "[data-test='add-to-cart-sauce-labs-bolt-t-shirt']", name: 'Sauce Labs Bolt T-Shirt', removeSelector: "[data-test='remove-sauce-labs-bolt-t-shirt']" }
        ]; 

        products.forEach(product => {
            ShoppingCartPage.addProduct(product.selector)
        });

        ShoppingCartPage.openCart()
        cy.url().should('include', '/cart')

        products.forEach(product => {
            ShoppingCartPage.verifyProductInCart(product.name)
        });

        const productToRemove = products[0]
        ShoppingCartPage.removeProduct(productToRemove.removeSelector)

        ShoppingCartPage.verifyCartItemCount(products.length - 1)
    });
    
});
````

## Testes de Finalização de Compra

```javascript	
import CheckoutPage from "../../page-objects/CheckoutPage";
import LoginPage from "../../page-objects/LoginPage";
import ShoppingCartPage from "../../page-objects/ShoppingCartPage";

describe('Finalização de compra', () => {
    
    beforeEach(() => {
        CheckoutPage.visit('/') 
        LoginPage.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory')      
    })

    it('CT001 - Preencher dados de entrega, finalizar a compra e verificar mensagem de sucesso', () => {
        
        const productSelector = "[data-test='add-to-cart-sauce-labs-backpack']";
        const expectedProductName = 'Sauce Labs Backpack';
        const expectedMessage = 'Thank you for your order!';

        ShoppingCartPage.addProduct(productSelector)
        ShoppingCartPage.openCart()
        cy.url().should('include', '/cart')
        ShoppingCartPage.verifyProductInCart(expectedProductName)

        CheckoutPage.checkoutButton()
        cy.url().should('include', '/checkout-step-one')
        CheckoutPage.fillShippingInformation('firstNameTest', 'lastNameTest', '12345678')
        CheckoutPage.continueCheckoutButton()
        cy.url().should('include', '/checkout-step-two')
        CheckoutPage.finishCheckoutButton()
        CheckoutPage.checkoutMessage(expectedMessage)
    });
    
    it('CT002 - Finalizar compra com dados incompletos e confirmar mensagem de erro', () => {
        
        const productSelector = "[data-test='add-to-cart-sauce-labs-backpack']";
        const expectedProductName = 'Sauce Labs Backpack';

        const expectedErrors = [
            'Error: First Name is required',
            'Error: Last Name is required',
            'Error: Postal Code is required',
        ];
        
        ShoppingCartPage.addProduct(productSelector)
        ShoppingCartPage.openCart()
        cy.url().should('include', '/cart')
        ShoppingCartPage.verifyProductInCart(expectedProductName)
        
        CheckoutPage.checkoutButton()
        CheckoutPage.fillShippingInformation('', 'LastNameTest', '12345678')
        CheckoutPage.continueCheckoutButton()
        CheckoutPage.errorCheckoutInformation(expectedErrors)
        cy.reload();

        CheckoutPage.fillShippingInformation('FirstNameTest', '', '12345678')
        CheckoutPage.continueCheckoutButton()
        CheckoutPage.errorCheckoutInformation(expectedErrors)
        cy.reload();

        CheckoutPage.fillShippingInformation('FirstNameTest', 'LastNameTest', '')
        CheckoutPage.continueCheckoutButton()
        CheckoutPage.errorCheckoutInformation(expectedErrors)
        
    });
});
````


### Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.


### **Desenvolvido por [José Júnior](https://www.linkedin.com/in/jose-junior07/)** 

 
