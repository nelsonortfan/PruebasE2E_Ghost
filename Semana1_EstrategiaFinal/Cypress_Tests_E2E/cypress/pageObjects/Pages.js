class createGhostPage{

  elements = { 
       titleInput : () => cy.get('textarea[placeholder="Page title"]'),      
       descriptionInput : () => cy.get('.koenig-lexical').eq(1),
	   publishButton : () => cy.contains('Publish'),
	   continueButton : () => cy.contains('Continue, final review'),
	   finalPublishButton : () => cy.contains('Publish page, right now')
   }
   
   
   createNewPage(title,description){
	   cy.contains('New page').click();
	   this.elements.titleInput().type(title);
	   this.elements.descriptionInput().type(description);
   }
   
   createNewPageWithoutTitle(description){
	   cy.contains('New page').click();	   
	   this.elements.descriptionInput().type(description);
   }
   
   publishNewPage(){
	   this.elements.publishButton().click();
	   cy.wait(1000);
	   this.elements.continueButton().click();
	   cy.wait(1000);
	   this.elements.finalPublishButton().click();	
   }
   
   get_elementList(index){
	   return cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(index);
   }
   
   updateTitlePage(title_new){
	   cy.get('textarea[placeholder="Page title"]').clear()		
	   cy.get('textarea[placeholder="Page title"]').type(title_new)
	   cy.wait(1000);
	   cy.contains('Update').click()
   }
   
   settings(){	   
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000)
   }
   
   deletePageConfirmation(){
	   cy.get('.settings-menu-delete-button').click()
	   cy.wait(1000)		
	   cy.get('.modal-content').should('be.visible')
	   cy.wait(1000)	
	   cy.get('.modal-footer').get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').		
	   contains('Delete').click({force: true})
   }
   
   asociateTag(value){
	   cy.get('div[id="tag-input"]').click()
	   cy.get('div[id="tag-input"]').type(value)
	   cy.get('div[id="tag-input"]').type('{enter}')
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);
	   cy.contains('Update').click()
   }
   
   get_valueTag(){
	   return cy.get('div[id="tag-input"]');
   }
   
   asociateUrl(value){	   
	   cy.get('.settings-menu-header').should('be.visible')
	   cy.get('input[id="url"]').should('be.visible')
	   cy.get('input[id="url"]').clear({force: true})
	   cy.get('input[id="url"]').click({force: true})
	   cy.get('input[id="url"]').type(value,{force: true})	   
	   cy.get('input[id="url"]').type('{enter}',{force: true})
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	   
   }
   
   get_valueUrl(){	  
	   return cy.get('p.ghost-url-preview.description.ember-view');
   }
   
   asociateExcerpt(value){
	   cy.get('textarea[id="custom-excerpt"]').click({force: true})
	   cy.get('textarea[id="custom-excerpt"]').type(value, {force: true})
	   cy.get('textarea[id="custom-excerpt"]').type('{enter}', {force: true})
	   cy.wait(1000);
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	
   }
   
   updateXTitle(value){
	   cy.get('button[data-test-button="twitter-data"]').click()
	   cy.wait(500)
	   cy.get('input[id="twitter-title"]').click()
	   cy.get('input[id="twitter-title"]').clear({force: true})
	   cy.get('input[id="twitter-title"]').type(value, {force: true})
	   cy.wait(1000);
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	
   }
   
   get_XTitle(){
	   cy.get('button[data-test-button="twitter-data"]').click()
	   cy.wait(500)
	   return cy.get('input[id="twitter-title"]')	   
   }
   
   updateFacebookTitle(value){
	   cy.get('button[data-test-button="facebook-data"]').click()
	   cy.wait(500)
	   cy.get('input[id="og-title"]').click()
	   cy.get('input[id="og-title"]').clear({force: true})
	   cy.get('input[id="og-title"]').type(value, {force: true})
	   cy.wait(1000);
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	
   }
   
   get_FacebookTitle(){
	   cy.get('button[data-test-button="facebook-data"]').click()
	   cy.wait(500)
	   return cy.get('input[id="og-title"]')	   
   }
   
   updateXDescription(value){
	   cy.get('button[data-test-button="twitter-data"]').click()
	   cy.wait(500)
	   cy.get('textarea[id="twitter-description"]').click()
	   cy.get('textarea[id="twitter-description"]').clear({force: true})
	   cy.get('textarea[id="twitter-description"]').type(value, {force: true})
	   cy.wait(1000);
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	
   }
   
   get_XDescription(){
	   cy.get('button[data-test-button="twitter-data"]').click()
	   cy.wait(500)
	   return cy.get('textarea[id="twitter-description"]')	   
   }
   
   updateFacebookDescription(value){
	   cy.get('button[data-test-button="facebook-data"]').click()
	   cy.wait(500)
	   cy.get('textarea[id="og-description"]').click()
	   cy.get('textarea[id="og-description"]').clear({force: true})
	   cy.get('textarea[id="og-description"]').type(value, {force: true})
	   cy.wait(1000);
	   cy.get('button[title="Settings"]').click()
	   cy.wait(1000);	
   }
   
   get_FacebookDescription(){
	   cy.get('button[data-test-button="facebook-data"]').click()
	   cy.wait(500)
	   return cy.get('textarea[id="og-description"]')	   
   }
   
}

export default createGhostPage;