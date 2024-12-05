import shoppingCartPage from "../../page-objects/shoppingCartPage";
import LoginPage from "../../page-objects/LoginPage";


describe('Carrinho de Compras', () => {

    beforeEach(() => {
        shoppingCartPage.visit('/')
    })

    it('CT001 - Adicionar um produto ao carrinho e verificar se o carrinho exibe o produto adicionado.', () => {
        const productSelector = "[data-test='add-to-cart-sauce-labs-backpack']";
        const expectedProductName = 'Sauce Labs Backpack';

        LoginPage.login('standard_user', 'secret_sauce')

        shoppingCartPage.addProduct(productSelector)
        shoppingCartPage.openCart()
        shoppingCartPage.verifyProductInCart(expectedProductName)
    });

    it('CT002 - Adicionar múltiplos produtos ao carrinho e confirmar se todos estão listados.', () => {
        const products = [
            { selector: "[data-test='add-to-cart-sauce-labs-backpack']", name: 'Sauce Labs Backpack'},
            { selector: "[data-test='add-to-cart-sauce-labs-bike-light']", name: 'Sauce Labs Bike Light'},
            { selector: "[data-test='add-to-cart-sauce-labs-bolt-t-shirt']", name: 'Sauce Labs Bolt T-Shirt'}
        ]; 

        LoginPage.login('standard_user', 'secret_sauce')

        products.forEach(product => {
            shoppingCartPage.addProduct(product.selector)
        });

        shoppingCartPage.openCart()

        products.forEach(product => {
            shoppingCartPage.verifyProductInCart(product.name)
        });
    });

    it('CT003 - Remover um produto do carrinho e verificar se o total é atualizado corretamente.', () => {
        const products = [
            { selector: "[data-test='add-to-cart-sauce-labs-backpack']", name: 'Sauce Labs Backpack', removeSelector: "[data-test='remove-sauce-labs-backpack']" },
            { selector: "[data-test='add-to-cart-sauce-labs-bike-light']", name: 'Sauce Labs Bike Light', removeSelector: "[data-test='remove-sauce-labs-bike-light']"},
            { selector: "[data-test='add-to-cart-sauce-labs-bolt-t-shirt']", name: 'Sauce Labs Bolt T-Shirt', removeSelector: "[data-test='remove-sauce-labs-bolt-t-shirt']" }
        ]; 

        LoginPage.login('standard_user', 'secret_sauce')

        products.forEach(product => {
            shoppingCartPage.addProduct(product.selector)
        });

        shoppingCartPage.openCart()

        products.forEach(product => {
            shoppingCartPage.verifyProductInCart(product.name)
        });

        const productToRemove = products[0]
        shoppingCartPage.removeProduct(productToRemove.removeSelector)

        shoppingCartPage.verifyCartItemCount(products.length - 1)
    });
    
});