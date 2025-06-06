
describe.skip("Http request",()=>{
    it("get call",()=>{
        const test = cy.request("GET","https://jsonplaceholder.typicode.com/posts")
        .its("status")
        .should("equal",200)
        console.log(test)
    })
})