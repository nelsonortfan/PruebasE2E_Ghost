// Use mockaroo to generate data for a post

const URI = " https://api.mockaroo.com/api";
const resource = "e23537b0";
// This should not be shared but oh well
const key = "a8940860";

export const generatePosts = (total) =>
  cy
    .request(`${URI}/${resource}.json?key=${key}&count=${total}`)
    .then((response) => cy.wrap(response.body));
