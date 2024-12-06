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