class createPageOld{
   
   
   createNewPage(title,description){
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page Title"]').type(title)
		cy.get('div[data-placeholder="Begin writing your page..."]').click().type(description)
		cy.wait(1000)
   }
   
   
   publishNewPage(){
	    cy.contains('Publish').click()
		cy.wait(1000)		
		cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
		cy.wait(1000)
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
	   cy.get('button.post-settings').click()
	   cy.wait(1000)
   }
       
   updateHeaderAndFooterPage(value, value2){
	   cy.get('li.nav-list-item:nth-child(4) > button:nth-child(1)').click()
	   cy.wait(500)
	   cy.get('#post-setting-codeinjection-head > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').click({force: true})
	   cy.get('#post-setting-codeinjection-head > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').clear({force: true})
	   cy.get('#post-setting-codeinjection-head > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').type(value, {force: true})
	   cy.wait(500)
	   cy.get('#post-setting-codeinjection-foot > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').click({force: true})
	   cy.get('#post-setting-codeinjection-foot > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').clear({force: true})
	   cy.get('#post-setting-codeinjection-foot > div:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)').type(value2, {force: true})	   		  	
   }
   
   backSettings(){
	   cy.get('button.back').click()		
	   cy.get('button.close').click()
	   cy.wait(500);
   }
   
   visitPage(value){
	  var pageUrl = Cypress.env("ghost_url_old").slice(0, -6) + "/" + value.replaceAll(" ",'-')	  
	  pageUrl = pageUrl.replace(".",'/')
	  cy.visit(pageUrl)
	  cy.wait(1000)
   }
   
   logout(){
	   cy.get('div.flex:nth-child(2)').click({force: true})
	   cy.get('.dropdown-menu > li:nth-child(9)').click()
	   cy.wait(2000)
   }
   
   
}

export default createPageOld;