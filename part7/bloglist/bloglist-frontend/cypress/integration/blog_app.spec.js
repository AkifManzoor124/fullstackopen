

describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.contains('login')
    })

    describe('Login',function() {

        beforeEach(function(){
            cy.contains('Login').click()
        })

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukai')
            cy.get('#password').type('salainen')
            cy.contains('login').click()
            cy.contains('Matti Luukkainen is logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('wrong')
            cy.get('#password').type('credentials')
            cy.contains('login').click()
            cy.contains('wrong credentials')
        })

    })

    describe('after logged in', function(){
        beforeEach(function(){
            cy.contains('Login').click()
            cy.get('#username').type('mluukai')
            cy.get('#password').type('salainen')
            cy.contains('login').click()
            cy.contains('Matti Luukkainen is logged in')
        })


        it('A blog can be created', function(){
            cy.contains('Add New Blog').click()
            cy.get('#title').type('Title of my first blog')
            cy.get('#author').type('The name of the author')
            cy.get('#url').type('www.posthumus.com')
            cy.contains('Save').click()
            cy.contains('Title of my first blog')
        })
    })

    describe.only('After login and blog is created', function(){
       
        beforeEach(function(){
            cy.contains('Login').click()
            cy.get('#username').type('mluukai')
            cy.get('#password').type('salainen')
            cy.contains('login').click()
            cy.contains('Add New Blog').click()
            cy.get('#title').type('Title of my first blog')
            cy.get('#author').type('The name of the author')
            cy.get('#url').type('www.posthumus.com')
            cy.contains('Save').click()
        })      
    
        it('blog can be liked', function(){
            cy.contains('view').click()
            cy.contains('0')
            cy.contains('Like').click()
            cy.contains('1')
        })

        it('blog can be deleted', function(){
            cy.contains('view').click()
            cy.contains('Delete').click()
            cy.should('not.contain', 'Title of my first blog')
        })

        it.only('blogs are listed in order of likes', function(){
            cy.contains('Add New Blog').click()
            cy.get('#title').type('Second blog')
            cy.get('#author').type('The name of the author')
            cy.get('#url').type('www.posthumus.com')
            cy.contains('Save').click()
            cy.contains('Second blog').contains('view').click()
            cy.contains('Like').click()
            cy.get('.blog:first').contains("Second blog")
        })
    })

})