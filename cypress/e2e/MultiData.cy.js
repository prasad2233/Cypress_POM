const jsonData = require('../fixtures/multiData.json')
describe("data driven test", () => {
    jsonData.forEach((testData) => {
        it(`login with user ${testData.regUserName}`, () => {
            cy.visit('https://bookcart.azurewebsites.net/login')
            cy.get('input[placeholder="Username"]').type(testData.regUserName)
            cy.get('input[placeholder="Password"]').type(testData.password)
            cy.get('span').contains('Login').should('be.visible').click();
            // cy.get('span').contains(testData.regUserName).should('be.visible');
        })
    })

})