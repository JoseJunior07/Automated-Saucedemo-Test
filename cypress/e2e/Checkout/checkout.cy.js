import CheckoutPage from "../../page-objects/CheckoutPage";
import LoginPage from "../../page-objects/LoginPage";
import ShoppingCartPage from "../../page-objects/ShoppingCartPage";

describe('Finalização de compra', () => {
    
    beforeEach(() => {
        CheckoutPage.visit('/') ;

        cy.fixture('users').then(users => {
            LoginPage.login(users.standard_user.username, users.standard_user.password)
        });

        cy.url().should('include', '/inventory') ;     
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
        cy.fixture('formData').then(formData => {
            cy.url().should('include', '/checkout-step-one')
            CheckoutPage.fillShippingInformation(formData.validData.firstName, formData.validData.lastName, formData.validData.postalCode)
            CheckoutPage.continueCheckoutButton()
            cy.url().should('include', '/checkout-step-two')
            CheckoutPage.finishCheckoutButton()
            CheckoutPage.checkoutMessage(expectedMessage)
        })
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
        
        cy.fixture('formData').then(formData => {
            CheckoutPage.checkoutButton()
            CheckoutPage.fillShippingInformation(formData.missingFirstName.firstName, formData.missingFirstName.lastName, formData.missingFirstName.postalCode)
            CheckoutPage.continueCheckoutButton()
            CheckoutPage.errorCheckoutInformation(expectedErrors)
            cy.reload();
        })

        cy.fixture('formData').then(formData => {
            CheckoutPage.fillShippingInformation(formData.missingLastName.firstName, formData.missingLastName.lastName, formData.missingLastName.postalCode)
            CheckoutPage.continueCheckoutButton()
            CheckoutPage.errorCheckoutInformation(expectedErrors)
            cy.reload();
        })

        cy.fixture('formData').then(formData => {
            CheckoutPage.fillShippingInformation(formData.missingPostalCode.firstName, formData.missingPostalCode.lastName, formData.missingPostalCode.postalCode)
            CheckoutPage.continueCheckoutButton()
            CheckoutPage.errorCheckoutInformation(expectedErrors)
        })
        
    });
});