function selectDateFromCurrent(days) {
    let date = new Date()
    date.setDate(date.getDate() + days)
    console.log(date)
    let futureDate = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDateFromCurrent(days)
        }
        else {
            cy.get(".day-cell").not('.ounding-month').contains(futureDate).click()
        }
    })
    return dateToAssert
}

export class DatePickerPage {
    selectCommonDatePickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', "Common Datepicker")
            .find('input').then(input => {
                cy.wrap(input).click();
                const dateToAssert = selectDateFromCurrent(dayFromToday)
                // const dateToAssert = selectDOB("2026-03-25");
                cy.wrap(input).invoke('prop', 'value').should('contains', dateToAssert)
                cy.wrap(input).should('have.value', dateToAssert)

            })
    }

     selectDatePickerWithRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', "Datepicker With Range")
            .find('input').then(input => {
                cy.wrap(input).click();
                const dateToAssertFirst = selectDateFromCurrent(firstDay)
                const dateToAssertSecond = selectDateFromCurrent(secondDay)
                // const dateToAssert = selectDOB("2026-03-25");
                const finalDate = dateToAssertFirst+' - '+dateToAssertSecond;
                cy.wrap(input).invoke('prop', 'value').should('contains', finalDate)
                cy.wrap(input).should('have.value', finalDate)

            })
    }
}

export const onDatePickerPage = new DatePickerPage();