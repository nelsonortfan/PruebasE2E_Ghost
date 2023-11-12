describe('Importar miembros', () => {
    beforeEach(()=>{
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(1000)
    })
    it('Import members and delete them', ()=>{
        cy.get('button[data-test-button="members-actions"]').click()
        cy.wait(500)
        cy.get('a[data-test-link="import-csv"]').click()
        cy.get('.x-file-input').first().within(() => {
            cy.get('.x-file--input').selectFile('members.csv', { force: true })
        })
        cy.wait(500)
        cy.get('button[data-test-button="perform-import"]').click()
        cy.wait(1000)
        cy.get('button[data-test-button="close-import-members"]').click()
        cy.wait(1000)
        cy.get('h3').then(($header)=>{
            expect($header[0].innerText).to.equal('Nombre de prueba 3')
            expect($header[1].innerText).to.equal('Nombre de prueba 2')
            expect($header[2].innerText).to.equal('Nombre de prueba 1')
        })
    })
  })