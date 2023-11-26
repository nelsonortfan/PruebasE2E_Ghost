// Post page objects

const toggleSettings = () => {
  cy.get('button[title="Settings"]').click();
};

class GoogleMetaDataObject {
  constructor() {
    cy.get('button[data-test-button="meta-data"]').click({ force: true });
  }
  get title() {
    return cy.get("#meta-title");
  }

  get description() {
    return cy.get("#meta-description");
  }

  setTitle(title) {
    this.title.clear().type(title);
  }
  setDescription(description) {
    this.description.clear().type(description);
  }
}

class XCardObject {
  constructor() {
    cy.get('button[data-test-button="twitter-data"]').click({ force: true });
  }
  get title() {
    return cy.get("#twitter-title");
  }

  get description() {
    return cy.get("#twitter-description");
  }

  setTitle(title) {
    this.title.clear().type(title);
  }
  setDescription(description) {
    this.description.clear().type(description);
  }
}

class FacebookCardObject {
  constructor() {
    cy.get('button[data-test-button="facebook-data"]').click({ force: true });
  }
  get title() {
    return cy.get("#og-title");
  }

  get description() {
    return cy.get("#og-description");
  }

  setTitle(title) {
    this.title.clear().type(title);
  }
  setDescription(description) {
    this.description.clear().type(description);
  }
}

class CodeInjectionObject {
  constructor() {
    cy.get('button[data-test-button="codeinjection"]').click({ force: true });
  }
  get header() {
    return cy.get("#post-setting-codeinjection-head");
  }

  get footer() {
    return cy.get("#post-setting-codeinjection-foot");
  }

  setHeader(header) {
    this.header.within(() => {
      cy.get(".CodeMirror-line").type(header);
    });
  }
  setFooter(footer) {
    this.footer.within(() => {
      cy.get(".CodeMirror-line").type(footer);
    });
  }
}

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
  get continueButton() {
    return cy.get('button[data-test-button="continue"]');
  }
  publishPost() {
    this.startPublishFlow();
    this.continueButton.click();
    cy.get('button[data-test-button="confirm-publish"]').click();
  }

  fillGoogleMetadata(googleMetadata) {
    toggleSettings();

    const metaData = new GoogleMetaDataObject();
    metaData.setTitle(googleMetadata.title);
    metaData.setDescription(googleMetadata.description);
    toggleSettings();
  }

  getGoogleMetaData() {
    toggleSettings();
    return new GoogleMetaDataObject();
  }

  getSelectedAccessLevel() {
    return cy.get('select[data-test-select="post-visibility"]');
  }

  setAccessLevel(accessLevel) {
    toggleSettings();
    this.getSelectedAccessLevel().select(accessLevel);
    toggleSettings();
  }

  getAccessLevel() {
    toggleSettings();
    return this.getSelectedAccessLevel();
  }

  get excerptField() {
    return cy.get("#custom-excerpt");
  }

  setExcerpt(excerpt) {
    toggleSettings();
    this.excerptField.type(excerpt);
    toggleSettings();
  }

  getExcerpt() {
    toggleSettings();
    return this.excerptField;
  }

  setXCard(xCardData) {
    toggleSettings();
    const xCard = new XCardObject();
    xCard.setTitle(xCardData.title);
    xCard.setDescription(xCardData.description);
    toggleSettings();
  }

  getXCard() {
    toggleSettings();
    return new XCardObject();
  }

  setFacebookCard(facebookCardData) {
    toggleSettings();
    const facebookCard = new FacebookCardObject();
    facebookCard.setTitle(facebookCardData.title);
    facebookCard.setDescription(facebookCardData.description);
    toggleSettings();
  }
  getFacebookCard() {
    toggleSettings();
    return new FacebookCardObject();
  }

  closePublish() {
    cy.get('button[data-test-button="close-publish-flow"]').click();
  }

  setCodeInjection(codeInjectionData) {
    toggleSettings();
    const codeInjection = new CodeInjectionObject();
    if (codeInjectionData.header) {
      codeInjection.setHeader(codeInjectionData.header);
    }
    if (codeInjectionData.footer) {
      codeInjection.setFooter(codeInjectionData.footer);
    }
    toggleSettings();
  }
  getCodeInjection() {
    toggleSettings();
    return new CodeInjectionObject();
  }
}

class PostCreatorObject extends PostEditOperations {
  createPostFromObject(post) {
    return this.createPost(
      post.title,
      post.content,
      post.publish,
      post.feature,
      post.tags,
      post.images,
      post.youtubeVideos,
      post.googleMetadata,
      post.accessLevel,
      post.excerpt,
      post.xCard,
      post.facebookCard,
      post.codeInjection
    );
  }

  createPost(
    title,
    content,
    publish = true,
    feature = false,
    tags = [],
    images = [],
    youtubeVideos = [],
    googleMetadata = null,
    accessLevel = null,
    excerpt = null,
    xCard = null,
    facebookCard = null,
    codeInjection = null
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
    if (googleMetadata) {
      this.fillGoogleMetadata(googleMetadata);
    }
    if (accessLevel) {
      this.setAccessLevel(accessLevel);
    }
    if (excerpt) {
      this.setExcerpt(excerpt);
    }
    if (xCard) {
      this.setXCard(xCard);
    }
    if (facebookCard) {
      this.setFacebookCard(facebookCard);
    }
    if (codeInjection) {
      this.setCodeInjection(codeInjection);
    }
    let postUrl = "";
    if (publish) {
      this.publishPost();
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

  filterByAccess(accessLevel) {
    cy.get(".gh-contentfilter-visibility").click();
    cy.get(".ember-power-select-options").within(() => {
      cy.contains(accessLevel).click();
    });
  }

  get noPostsMessage() {
    return cy.contains("No posts match the current filter");
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
  get excerpt() {
    return cy.get("p.gh-article-excerpt");
  }
  get body() {
    return cy.get("body");
  }
}

class TagCreatorObject {
  createTag(name, description) {
    cy.goToPage("tags");
    cy.contains("New tag").click();
    cy.get("#tag-name").type(name);
    cy.get("#tag-description").type(description);
    cy.contains("Save").click();
  }
}

export {
  PostCreatorObject,
  PostListObject,
  PostDetailObject,
  PostViewObject,
  PostListDetailObject,
  TagCreatorObject,
};
