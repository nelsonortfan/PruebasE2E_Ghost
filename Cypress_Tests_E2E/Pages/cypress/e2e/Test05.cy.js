describe('Testing Ghost Initial', () => {
	
	var userLocation = 'Bogota-Colombia'
	var userWebSite = 'http://mywebsite.com'
	var userFacebook = 'http://www.facebook.com/lucasBunny'

	
    beforeEach(()=>{	   
       cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1000)
		cy.get('input[name="identification"]').type('your_email')
		cy.get('input[name="password"]').type('your_password')
        cy.contains('Sign in').click()
        cy.wait(1000)        
    })
	
	
	it('Acceder a Settings para actualizar Staff', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/settings')
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-location"]').clear()
		cy.get('input[id="user-location"]').type(userLocation)
		cy.get('input[id="user-website"]').clear()
		cy.get('input[id="user-website"]').type(userWebSite)
		cy.get('input[id="user-facebook"]').clear()
		cy.get('input[id="user-facebook"]').type(userFacebook)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
    })

	it('Validar información en Settings Staff actualizada', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/settings')
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)
		const item1 = cy.get('input[id="user-location"]')		
		const item2 = cy.get('input[id="user-website"]')		
		const item3 = cy.get('input[id="user-facebook"]')		
		cy.wait(1000)
    }) 
	
    
  })