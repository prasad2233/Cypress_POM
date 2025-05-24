/// <reference types="cypress" />

describe("Login test cases", () => {
    beforeEach('naviage to url', () => {
        cy.visit('https://www.saucedemo.com/')
    })
    it("Login with valid creds", () => {
        cy.document().its('contentType').should('eq', 'text/html')
        cy.get('#user-name').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
    })

    it("logout Test ", () => {
        cy.get('#user-name').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
    })

    it("Assertions in cypress", () => {
        cy.get('div#login_credentials h4').then((element) => {
            expect(element.text()).to.equal('Accepted usernames are:')
        })
        cy.get('div#login_credentials h4').contains('Accepted usernames are:').then((element) => {
            expect(element.text()).to.equal('Accepted usernames are:')
        })
        cy.get('div#login_credentials h4').should('have.text', "Accepted usernames are:")
        cy.get('div#login_credentials h4').should('contain', "Accepted usernames are:")
        cy.get('#user-name').should('be.visible').type('standard_user')
        cy.get('#user-name').should('have.attr', 'value', 'standard_user')
        cy.get('div#login_credentials h4').should('have.html', "Accepted usernames are:")
        cy.get('#user-name').should('have.attr', 'value').and("include", "standard_user")
        cy.get('div#login_credentials h4').contains('Accepted usernames are:').then((element) => {
            expect(element.text()).to.have.length(23);
        })
    })
})