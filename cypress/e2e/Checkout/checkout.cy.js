import checkoutPage from "../../page-objects/checkoutPage";
import LoginPage from "../../page-objects/LoginPage";
import shoppingCartPage from "../../page-objects/shoppingCartPage";

describe('Finalização de compra', () => {
    
    beforeEach(() => {
        checkoutPage.visit('/')
    })

    it('Preencher dados de entrega, finalizar a compra e verificar mensagem de sucesso', () => {
        
        const productSelector = "[data-test='add-to-cart-sauce-labs-backpack']";
        const expectedProductName = 'Sauce Labs Backpack';
        const expectedMessage = 'Thank you for your order!';

        LoginPage.login('standard_user', 'secret_sauce')

        shoppingCartPage.addProduct(productSelector)
        shoppingCartPage.openCart()
        shoppingCartPage.verifyProductInCart(expectedProductName)

        checkoutPage.checkoutButton()
        checkoutPage.fillShippingInformation('firstNameTest', 'lastNameTest', '12345678')
        checkoutPage.continueCheckoutButton()
        checkoutPage.finishCheckoutButton()
        checkoutPage.checkoutMessage(expectedMessage)
    });
    
});