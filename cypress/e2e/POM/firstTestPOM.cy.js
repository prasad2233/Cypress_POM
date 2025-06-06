const { onDatePickerPage } = require("../../support/pageObjects/datePickerPage")
const { onFormLayoutPage } = require("../../support/pageObjects/formLayout")
const { navigateTo } = require("../../support/pageObjects/navigationPage")

describe.skip('POM tests', () => {
    beforeEach('open application', () => {
        cy.visit('http://localhost:4200/')
    })

    it("verifying navigations ", () => {
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage();
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
    })

    it("End to End test", () => {
        navigateTo.formLayoutPage()
        onFormLayoutPage.sumbitInlienFormWithNameAndEmail("prasad", "hello@gmail.com");
        onFormLayoutPage.submitBasciForm('emailme@emailo.com', "passw@32we")
        cy.wait(500)
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(200)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7,14)
    })
})