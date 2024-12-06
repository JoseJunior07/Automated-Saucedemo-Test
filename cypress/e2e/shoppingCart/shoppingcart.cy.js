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