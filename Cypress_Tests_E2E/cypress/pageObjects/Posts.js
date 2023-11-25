// Post page objects

const toggleSettings = () => {
  cy.get('button[title="Settings"]').click();
};

class PostEditOperations {
  get titleField() {
    return cy.get('textarea[placeholder="Post title"]');
  }
  get contentField() {
    return cy.get(".koenig-lexical").eq(1);
  }
  setTitle(title) {
    this.titleField.type(title);
  }
  setContent(content) {
    this.contentField.click().type(content);
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
  clickCardMenu() {
    cy.get("span[data-lexical-text='true']").eq(0).click().type("{enter}");
    cy.get('button[aria-label="Add a card"]').click();
  }
  addImage(imagePath) {
    this.clickCardMenu();
    cy.get('button[data-kg-card-menu-item="Image"]').click();
    cy.get('input[name="image-input"]').selectFile(imagePath, {
      force: true,
    });
  }

  addYoutubeVideo(videoUrl, verify = true) {
    this.clickCardMenu();
    cy.get('button[data-kg-card-menu-item="YouTube"]').click({ force: true });
    cy.get('input[data-testid="embed-url"]').type(videoUrl + "{enter}");
    if (verify) {
      this.youtubeVideos;
    }
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

  get youtubeVideos() {
    return cy.get('iframe[data-testid="embed-iframe"]');
  }
}

class PostCreatorObject extends PostEditOperations {
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
      post.images,
      post.youtubeVideos
    );
  }

  createPost(
    title,
    content,
    publish = true,
    feature = false,
    tags = [],
    images = [],
    youtubeVideos = []
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
    if (youtubeVideos) {
      youtubeVideos.forEach((video) => {
        this.addYoutubeVideo(video);
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
    this.$element = $element;
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
        [...$posts].map((post) => {
          return new PostListDetailObject(cy.get(post));
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

class PostDetailObject extends PostEditOperations {
  constructor(id) {
    super();
    this.id = id;
    this.goToPost();
  }
  goToPost() {
    cy.goToPage(`editor/post/${this.id}`);
  }
  update() {
    cy.get('button[data-test-button="publish-save"]').click();
  }
  delete() {
    toggleSettings();
    cy.contains("Delete").scrollIntoView();
    cy.contains("Delete").click();
    cy.get(".gh-btn-red").click();
  }
  setTitle(title) {
    this.titleField.clear();
    super.setTitle(title);
  }
  setContent(content) {
    this.contentField.clear();
    super.setContent(content);
  }

  unpublish() {
    cy.get('button[data-test-button="update-flow"]').click();
    cy.get('button[data-test-button="revert-to-draft"]').click();
    cy.wait(1000);
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

export {
  PostCreatorObject,
  PostListObject,
  PostDetailObject,
  PostViewObject,
  PostListDetailObject,
};
