class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    (this.inputs = {
      title: document.querySelector('#title'),
      body: document.querySelector('#body'),
      id: document.querySelector('#id'),
    }),
      (this.postSubmit = document.querySelector('.post-submit'));
    this.formEnd = document.querySelector('.form-end');
    this.formState = 'add';
  }

  showPosts(posts) {
    if (posts.length > 0) {
      let output = '';

      posts.forEach((post) => {
        output += `
          <div class="card mb-3">
            <div class="card-body">
              <h4 class="card-title">${post.title}</h4>
              <p class="card-text">${post.body}</p>
              <a href="#" class="edit card-link" data-id="${post.id}">
                <i class="fa-solid fa-pencil"></i>
              </a>
              <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa-solid fa-xmark"></i>
              </a>
            </div>
          </div>
        `;
      });

      this.posts.innerHTML = output;
    }
  }

  // Fill form with post to edit
  fillForm(post) {
    this.inputs.title.value = post.title;
    this.inputs.body.value = post.body;
    this.inputs.id.value = post.id;
  }

  getFormPost() {
    return {
      title: this.inputs.title.value,
      body: this.inputs.body.value,
      id: this.inputs.id.value,
    };
  }

  changeFormState(state) {
    this.formState = state;

    if (this.formState === 'edit') {
      // Handle case when user clicks edit multiple time
      if (document.querySelector('.post-cancel')) return;

      this.postSubmit.textContent = 'Update';
      this.postSubmit.classList.remove('btn-primary');
      this.postSubmit.classList.add('btn-warning');

      const cancelSubmit = document.createElement('button');
      cancelSubmit.className = 'post-cancel btn btn-secondary rounded my-1';
      const text = document.createTextNode('Cancel');
      cancelSubmit.appendChild(text);

      // Insert after post-submit button
      this.postSubmit.parentElement.insertBefore(
        cancelSubmit,
        this.postSubmit.nextSibling
      );
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.classList.add('btn-primary');
      this.postSubmit.classList.remove('btn-warning');

      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
    }
  }

  showAlert(msg, type) {
    if (document.querySelector('.alert')) {
      this.clearAlert();
    }

    // Create element, add class and content
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} rounded my-3`;
    const text = document.createTextNode(msg);
    alertDiv.appendChild(text);

    // Insert to form
    this.formEnd.parentElement.insertBefore(alertDiv, this.formEnd);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const alertDiv = document.querySelector('.alert');
    alertDiv.remove();
  }

  clearInputs() {
    this.inputs.title.value = '';
    this.inputs.body.value = '';
    this.inputs.id.value = '';
  }
}

export const ui = new UI();
