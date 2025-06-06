/// <reference types="cypress" />

describe.skip("First test suite", () => {

    it("first test", () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //by tag name
        cy.get("input")

        //by attribute
        cy.get("[fullwidth]")

        //by attribute and value 
        cy.get(`input[placeholder="Email"]`)

        //by id
        cy.get(`#inputEmail1`)

        //by class
        cy.get('.input-full-width.size-medium.shape-rectangle')

        //by two attributes
        cy.get('input[placeholder="Email"][fullwidth]')

        //by tag , attribute id calss
        cy.get(`input[placeholder="Email"]#inputEmail1.input-full-width`)

        //by class test id
        cy.get(`[data-cy="imputEmail1"]`)

    })

    it('Second test', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.contains('Sign in')
        cy.contains('[status="warning"]', "Sign in")
        cy.contains('nb-card', "Horizontal form").find("button")
        cy.contains('nb-card', "Horizontal form").contains('Sign in')
        cy.contains('nb-card', "Horizontal form").get('button')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', "Sign in")
            .parents('form')
            .find('nb-checkbox')
            .click();
    })

    it("save subject of the command", () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', "Email")
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', "Password")

        // alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', "Email")
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', "Password")

        //2 then()
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', "Email")
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', "Password")
        })
    })

    it('Extarct text values', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[for="exampleInputEmail1"]').should('contain', "Email address")

        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        //invoke attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //invoke property
        cy.get('#exampleInputEmail1').type('testuser@gmail.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'testuser@gmail.com').then(property => {
            expect(property).to.equal('testuser@gmail.com')
        })
    })

    it("radio buttons and checkboxes", () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked');
            cy.wrap(radioButtons).eq(1).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2)
        })
    })

    it('checkboxe ', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').uncheck({ force: true })
        cy.get('[type="checkbox"]').eq(1).click({ force: true })
        cy.get('[type="checkbox"]').eq(2).check({ force: true })

    })

    it("date picker", () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

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

        function selectDOB(dob) {
            const date = new Date(dob); // Accepts a string like "1995-03-25" or a Date object

            const targetDate = date.getDate();
            const targetMonth = date.toLocaleDateString('en-US', { month: 'short' }); // e.g., "Mar"
            const targetYear = date.getFullYear();
            const dateToAssert = `${targetMonth} ${targetDate}, ${targetYear}`;

            const monthMap = {
                Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
            };

            cy.get('nb-calendar-navigation')
                .invoke('attr', 'ng-reflect-date')
                .then(dateAttribute => {
                    const parts = dateAttribute.split(' '); // e.g., ["Sun", "Mar", "30", "2025", ...]
                    const currentMonth = parts[1];
                    const currentYear = parseInt(parts[3]);

                    const currentMonthIndex = monthMap[currentMonth];
                    const targetMonthIndex = monthMap[targetMonth];

                    if (currentYear !== targetYear || currentMonthIndex !== targetMonthIndex) {
                        if (currentYear < targetYear || (currentYear === targetYear && currentMonthIndex < targetMonthIndex)) {
                            cy.get('[data-name="chevron-right"]').click();
                        } else {
                            cy.get('nb-calendar [data-name="chevron-left"]').click();
                        }

                        cy.wait(200).then(() => {
                            selectDOB(dob); // Recursive call with same DOB
                        });
                    } else {
                        cy.get(".day-cell").not('.bounding-month').contains(targetDate).click();
                    }
                });

            return dateToAssert;
        }

        cy.contains('nb-card', "Common Datepicker")
            .find('input').then(input => {
                cy.wrap(input).click();
                // const dateToAssert = selectDateFromCurrent(500)
                const dateToAssert = selectDOB("2026-03-25");
                cy.wrap(input).invoke('prop', 'value').should('contains', dateToAssert)
                cy.wrap(input).should('have.value', dateToAssert)

            })
    })

    it('List and dropdowns', () => {
        cy.visit('http://localhost:4200/')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemIndex = listItem.text().trim()
                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemIndex)
                if (index < 3) {
                    cy.wrap(dropDown).click();
                }
            })
        })
    })

    it('tables test cases', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('prasad')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Narala')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').find('td').then(tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain', 'prasad')
            cy.wrap(tableColumn).eq(3).should('contain', 'Narala')
        })
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', "No data found")
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('tooltip ', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();
        cy.contains('nb-card', "Colored Tooltips").contains
            ('Default').click()
        cy.get('nb-tooltip').should('contain', "This is a tooltip")
    })

    it.only("dialog box", () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', () => false)
    })
})
