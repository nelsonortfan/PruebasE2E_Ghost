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
   
}

export default createGhostPage;