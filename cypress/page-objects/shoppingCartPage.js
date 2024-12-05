class shoppingCart {
    visit() {
        cy.visit('/')
    }
    

    addProduct(productSelector) {
        cy.get(productSelector).click()    
    }

    openCart() {
        cy.get("[data-test='shopping-cart-link']").click() 
        cy.get("[data-test='cart-list']").should('exist')
    }

    verifyProductInCart(expectedProductName) {
        cy.get('.cart_item .inventory_item_name').should('contain.text', expectedProductName)
    }

    removeProduct(productSelector) {
        cy.get(productSelector).click() 
    }

    verifyCartItemCount(expectedCount) {
        cy.get("[data-test='shopping-cart-badge']").should('have.text', expectedCount.toString())
    }

}

export default new shoppingCart ()