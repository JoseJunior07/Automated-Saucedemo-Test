class checkout {
   visit() {
    cy.visit('/')
   } 

   checkoutButton() {
    cy.get("[data-test='checkout']").click()
   }

   fillShippingInformation(firstName = '', lastName = '', postalCode = '') {
    if (firstName) {
        cy.get('[data-test="firstName"]').clear().type(firstName); 
    }
    if (lastName) {
        cy.get('[data-test="lastName"]').clear().type(lastName); 
    }
    if (postalCode) {
        cy.get('[data-test="postalCode"]').clear().type(postalCode); 
    }
}


   continueCheckoutButton() {
    cy.get("[data-test='continue']").click()
   }

   finishCheckoutButton() {
    cy.get("[data-test='finish']").click()
   }

   checkoutMessage(expectedMessage) {
    
    cy.get("[data-test='complete-header']").should('have.text', expectedMessage)
   }

   errorCheckoutInformation(expectedErrors) {
    cy.get("[data-test='error']").then((errorMessage) => {
        expect(expectedErrors).to.include(errorMessage.text());
    });
   }

}

export default new checkout() 