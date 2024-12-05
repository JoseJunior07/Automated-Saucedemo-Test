class NavigationPage {
    visit() {
        cy.visit('/')
    };

    get productItems() {
        return cy.get("[data-test='inventory-item-description']")
    }
    countItems() {
        this.productItems.should('have.length.greaterThan', 5)
    };

    productSortContainer() {
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
    }

    inventoryItemPrice() {
        cy.get("[data-test='inventory-item-price']").then(($prices) => { 
            // Extrai o texto dos preços, remove o símbolo de moeda, e converte em números
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '').trim()));
            // map() e parseFloat(): Extrai os preços dos produtos, remove símbolos de moeda (se existirem) e os converte para números para comparação.

            cy.log(prices)
             // Verifica se os preços estão em ordem crescente
            for (let i = 0; i < prices.length - 1; i++) {
                expect(prices[i]).to.be.at.most(prices[i + 1]);
            } // Garante que o preço atual seja menor ou igual ao próximo
        })
    }

    productClick(productSelector, expectedProductName) {
        cy.get(productSelector).click()
        cy.get('[data-test="inventory-item-name"]').should('contain.text', expectedProductName)
    }
    
}

export default new NavigationPage()