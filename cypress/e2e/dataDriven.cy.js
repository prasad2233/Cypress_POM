describe("data driven test", () => {
    let testData;
    before("run Before all tests", () => {
        cy.fixture('login.json').then((jsonData) => {
            testData = jsonData
        })
    })
    it("login test ", () => {
        let userName = `${testData.newUser.regUserName}${Math.floor(Math.random() * 10000)}`;
        cy.visit('https://bookcart.azurewebsites.net/login')
        cy.contains('Register').click()
        cy.get('input[placeholder="First name"]').type(testData.newUser.firstName)
        cy.get('input[placeholder="Last Name"]').type(testData.newUser.lastName)
        cy.get('input[type="radio"]').check(testData.newUser.gender)
        cy.get('input[placeholder="User name"]').type(userName)
        cy.get('input[placeholder="Password"]').type(testData.newUser.password)
        cy.get('input[placeholder="Confirm Password"]').type(testData.newUser.confirmPassword)
        cy.wait(2000)
        cy.get('button').contains('Register').should('be.visible').click();
        cy.get('input[placeholder="Username"]').should("be.visible")
        cy.get('input[placeholder="Username"]').type(testData.newUser.regUserName)
        cy.get('input[placeholder="Password"]').type(testData.newUser.password)
        cy.get('mat-card-actions button>span.mdc-button__label').should('be.visible').click();
        // cy.get('span').contains(testData.newUser.regUserName).should('be.visible');
    })
})