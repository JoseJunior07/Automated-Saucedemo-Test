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

        NavigationPage.productClick('[data-test="item-4-title-link"]', 'Sauce Labs Backpack')
    });

    
});