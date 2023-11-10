describe('Actualizar valores de Staff en Settings', () => {
	
	var userLocation = 'Bogota-Colombia'
	var userWebSite = 'http://mywebsite.com'
	var userFacebook = 'https://www.facebook.com/lucasBunny'
	var validation = ''

	
    beforeEach(()=>{
		cy.fixture("ghost_credentials.json").then((credentials) => {
		cy.session(credentials.email, () => {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.get('input[name="identification"]').type(credentials.email);
		cy.get('input[name="password"]').type(credentials.password);
		cy.contains("Sign in").click();
		cy.wait(1000);
		});		
		})
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
		cy.get('input[id="user-location"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userLocation)	
		})
		cy.get('input[id="user-website"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userWebSite)	
		})
		cy.get('input[id="user-facebook"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userFacebook)	
		})
		cy.wait(1000)
    }) 
	
    
  })