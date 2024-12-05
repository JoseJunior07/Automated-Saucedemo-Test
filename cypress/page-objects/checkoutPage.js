class checkout {
   visit() {
    cy.visit('/')
   } 

   checkoutButton() {
    cy.get("[data-test='checkout']").click()
   }

   fillShippingInformation(firstName, lastName, postalCode) {
    cy.get('[data-test="firstName"]').type(firstName); 
    cy.get('[data-test="lastName"]').type(lastName); 
    cy.get('[data-test="postalCode"]').type(postalCode); 
      
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

}

export default new checkout() 