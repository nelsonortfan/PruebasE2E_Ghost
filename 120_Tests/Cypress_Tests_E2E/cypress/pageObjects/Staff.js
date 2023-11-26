class GhostStaff{

  
   selectOwnerStaff(){
	    cy.goToPage("settings/");	
		cy.wait(1000)		
		cy.contains('Staff').click()
		cy.wait(1000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
   }
   
   updateBio(value){
	   cy.get('textarea[id="user-bio"]').clear()
	   cy.get('textarea[id="user-bio"]').type(value)
	   cy.wait(1000)
   }
   
   updateSlug(value){
	   cy.get('input[id="user-slug"]').clear()
	   cy.get('input[id="user-slug"]').type(value)
	   cy.wait(1000)
   }
   
   updateFullName(value){
	   cy.get('input[id="user-name"]').clear()
	   cy.get('input[id="user-name"]').type(value)
	   cy.wait(1000)
   }
   
   updateLocation(value){
	   cy.get('input[id="user-location"]').clear()
	   cy.get('input[id="user-location"]').type(value)
	   cy.wait(1000)
   }
   
   updateWebSite(value){
	   cy.get('input[id="user-website"]').clear()
	   cy.get('input[id="user-website"]').type(value)
	   cy.wait(1000)
   }
   
   updateTwitter(value){
	   cy.get('input[id="user-twitter"]').clear()
	   cy.get('input[id="user-twitter"]').type(value)
	   cy.wait(1000)
   }
   
   updateFacebook(value){
	   cy.get('input[id="user-facebook"]').clear()
	   cy.get('input[id="user-facebook"]').type(value)
	   cy.wait(1000)
   }
   
   changePasswords(curretPassword, newPassword, validatedPassword){
	  cy.get('input[id="user-password-old"]').click()
	  cy.get('input[id="user-password-old"]').type(curretPassword)
	  cy.wait(1000)
	  cy.get('input[id="user-password-new"]').click()
	  cy.get('input[id="user-password-new"]').type(newPassword)
	  cy.wait(1000)
	  cy.get('input[id="user-new-password-verification"]').click()
	  cy.get('input[id="user-new-password-verification"]').type(validatedPassword)
	  cy.wait(1000)
	  cy.contains('Change Password').click()
	  cy.wait(1000) 
   }
   
   changePasswordsWithoutCurrent(newPassword, validatedPassword){
	  cy.get('input[id="user-password-new"]').click()
	  cy.get('input[id="user-password-new"]').type(newPassword)
	  cy.wait(1000)
	  cy.get('input[id="user-new-password-verification"]').click()
	  cy.get('input[id="user-new-password-verification"]').type(validatedPassword)
	  cy.wait(1000)
	  cy.contains('Change Password').click()
	  cy.wait(1000) 
   }
   
   saveChanges(){
	   cy.get('button[data-test-save-button=""]').click()
	   cy.wait(1000)
	   cy.contains('Saved')
   }
   
}

export default GhostStaff;