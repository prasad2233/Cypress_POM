export class formLayoutPage{
    sumbitInlienFormWithNameAndEmail(name, email){
        cy.contains('nb-card', "Inline form").find('form').then(form =>{
            cy.wrap(form).find('[placeholder="Jane Doe"]').clear().type(name)
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).submit();
        })
    }

    submitBasciForm(email, Password){
          cy.contains('nb-card', "Basic form").find('form').then(form =>{
            cy.wrap(form).find('#exampleInputEmail1').clear().type(email)
            cy.wrap(form).find('#exampleInputPassword1').clear().type(Password)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit();
        })
    }
}
export const onFormLayoutPage = new formLayoutPage();