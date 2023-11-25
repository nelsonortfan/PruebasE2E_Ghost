// Post page objects

const toggleSettings = () => {
  cy.get('button[title="Settings"]').click();
};
class PostCreatorObject {
  setTitle(title) {
    cy.get('textarea[placeholder="Post title"]').type(title);
  }
  setContent(content) {
    cy.get(".koenig-lexical").eq(1).click().type(content);
  }
  startPublishFlow() {
    cy.get('button[data-test-button="publish-flow"]').click();
  }
  opeNewPost() {
    cy.goToPage("dashboard");
    cy.get('a[title="New post"]').click();
  }

  setFeatured() {
    toggleSettings();
    cy.get('label[for="featured"]').click();
    toggleSettings();
  }
  setTags(tags) {
    toggleSettings();
    cy.get("#tag-input").click();
    tags.forEach((tag) => {
      cy.contains(tag.name).click({ force: true });
    });
    toggleSettings();
  }
  addImage(imagePath) {
    cy.get("span[data-lexical-text='true']").eq(0).click().type("{enter}");
    cy.get('button[aria-label="Add a card"]').click();
    cy.get('button[data-kg-card-menu-item="Image"]').click();
    cy.get('input[name="image-input"]').selectFile(imagePath, {
      force: true,
    });
  }

  get continueButton() {
    return cy.get('button[data-test-button="continue"]');
  }

  createPostFromObject(post) {
    return this.createPost(
      post.title,
      post.content,
      post.publish,
      post.feature,
      post.tags,
      post.images
    );
  }

  createPost(
    title,
    content,
    publish = true,
    feature = false,
    tags = [],
    images = []
  ) {
    this.opeNewPost();
    this.setTitle(title);
    this.setContent(content);
    if (feature) {
      this.setFeatured();
    }
    if (tags) {
      this.setTags(tags);
    }
    if (images) {
      images.forEach((image) => {
        this.addImage(image);
      });
    }
    let postUrl = "";
    if (publish) {
      this.startPublishFlow();
      this.continueButton.click();
      cy.get('button[data-test-button="confirm-publish"]').click();
      cy.get("a[data-test-complete-bookmark]")
        .should("have.attr", "href")
        .then((href) => {
          postUrl = href;
        });
      cy.wait(100);
    }

    return cy.url().then((url) => {
      return cy.wrap({
        url: url,
        id: url.split("/").pop(),
        title,
        content,
        publish,
        postUrl,
      });
    });
  }
  get validationError() {
    return cy.get(".gh-alert-content");
  }
}

class PostListDetailObject {
  constructor($element) {
    // $element is the DOM element
    this.$element = cy.get($element);
  }
  get title() {
    return this.$element.get(".gh-content-entry-title");
  }
  get status() {
    return this.$element.get(".gh-content-entry-status");
  }
  get isFeatured() {
    return this.$element.get(".gh-featured-post");
  }
}

class PostListObject {
  get postListElements() {
    return cy.get(".gh-posts-list-item-group");
  }
  goToPosts() {
    cy.goToPage("posts");
  }
  listPosts() {
    this.goToPosts();
    return this.postListElements.then(($posts) => {
      return cy.wrap(
        [...$posts].map(($post) => {
          return new PostListDetailObject($post);
        })
      );
    });
  }

  getPost(id) {
    this.goToPosts();
    this.postListElements.get(`a[href*="/editor/post/${id}"]`).should("exist");
    return new PostDetailObject(id);
  }
}

class PostDetailObject {
  constructor(id) {
    this.id = id;
    cy.goToPage(`editor/post/${id}`);
  }
  get title() {
    return cy.get('textarea[placeholder="Post title"]');
  }
  get content() {
    return cy.get(".koenig-lexical");
  }
  getTags() {
    toggleSettings();
    return cy.get("li.tag-token");
  }
  get images() {
    return cy.get("img.mx-auto.block ");
  }
}

class PostViewObject {
  constructor(postUrl) {
    cy.visit(postUrl);
  }
  get isFeatured() {
    return cy.get("article.featured");
  }
}

export { PostCreatorObject, PostListObject, PostDetailObject, PostViewObject };