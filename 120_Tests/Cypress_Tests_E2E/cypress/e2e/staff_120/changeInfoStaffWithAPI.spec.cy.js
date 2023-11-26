import GhostStaff from '../../pageObjects/Staff'

var testData
var validation
const staffObj = new GhostStaff();	

describe('Prueba de cambio passwords Staff', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
		cy.request('GET','https://my.api.mockaroo.com/staffGhost.json?key=72f19ae0').then( (response) => {
					testData = response.body;					
			})			
    })


    it('Try to update the Bio successfully', () => {		
		cy.wait(1000)		
		staffObj.selectOwnerStaff()
		staffObj.updateBio(testData[0].bio1)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('textarea[id="user-bio"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].bio1)	
		})
		cy.wait(1000)
    })		
	
	it('Try to update the Bio with more of 200 characters', () => {		
		cy.wait(1000)	
		staffObj.selectOwnerStaff()
		staffObj.updateBio(testData[0].bio2)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Retry')
		cy.wait(1000)						
    })	
	
	
	it('Update the full Name successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateFullName(testData[0].full_name)		
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-name"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].full_name)	
		})
		cy.wait(1000)						
    })

	
	it('Update the slug successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateSlug(testData[0].slug)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-slug"]').should(($input) => {		
		validation = $input.val()		
		expect(validation).to.equal(testData[0].slug.toLowerCase())	// Issue -> El valor cambia la primera letra a minuscula
		})
		cy.wait(1000)						
    })
	
	
	it('Slug with more than two words should not use spaces between them', () => {	

		let nameWithoutSpaces = testData[0].full_name.replace(" ",'-')
		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateSlug(testData[0].full_name)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-slug"]').should(($input) => {		
		validation = $input.val()		
		expect(validation).to.equal(nameWithoutSpaces.toLowerCase())	
		})
		cy.wait(1000)						
    })	
	
	
	it('Update the Location successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateLocation(testData[0].location)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-location"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].location)	
		})
		cy.wait(1000)						
    })
	
	
	it('Update the WebSite of the Staff successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateWebSite(testData[0].web_site)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-website"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
	
	
	it('Update the Twitter of the Staff successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateTwitter(testData[0].web_site)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-twitter"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
	

	it('Update the Facebook url of the Staff successfully', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.updateFacebook(testData[0].web_site)
		staffObj.saveChanges()
		staffObj.selectOwnerStaff()
		cy.get('input[id="user-facebook"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
		
})