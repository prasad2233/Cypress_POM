/// <reference types="cypress" />

describe("Login test cases", () => {
    beforeEach('naviage to url', () => {
        cy.visit('https://www.saucedemo.com/')
    })
    it("Login with valid creds", () => {

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
})