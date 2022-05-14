import { http } from './http';
import { ui } from './ui';

const BASE_URL = 'http://localhost:3004/posts';

const showPosts = async () => {
  const posts = await http.get(BASE_URL);
  ui.showPosts(posts);
};

const submitPost = async () => {
  const post = ui.getFormPost();

  if (post.title.trim() === '' || post.body.trim() === '') {
    ui.showAlert('Please fill in all fields.', 'danger');
    return;
  }

  if (ui.formState === 'add') {
    await http.post(BASE_URL, post);
    ui.showAlert('Post added!', 'success');
    showPosts();
    ui.clearInputs();
  } else if (ui.formState === 'edit') {
    await http.put(`${BASE_URL}/${post.id}`, post);
    ui.showAlert('Post updated!', 'success');
    showPosts();
    ui.clearInputs();
    ui.changeFormState('add');
  }
};

const handleEditPost = async (e) => {
  e.preventDefault();

  if (e.target.parentElement.classList.contains('edit')) {
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const id = +e.target.parentElement.dataset.id;

    const post = {
      title,
      body,
      id,
    };

    ui.fillForm(post);
    ui.changeFormState('edit');
  }
};

const deletePost = async (e) => {
  if (e.target.parentElement.classList.contains('delete')) {
    if (!confirm('Are you sure?')) return;

    const postId = +e.target.parentElement.dataset.id;
    await http.delete(`${BASE_URL}/${postId}`);
    ui.showAlert('Post deleted!', 'success');
    showPosts();

    if ((await http.get(BASE_URL)).length === 0) {
      window.location.reload();
    }
  }
};

const handleCancelEdit = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
    ui.clearInputs();
  }
};

// Get posts on DOM Load
document.addEventListener('DOMContentLoaded', showPosts);

// Post submit event listener
ui.postSubmit.addEventListener('click', submitPost);

// Post edit event listener
ui.posts.addEventListener('click', handleEditPost);

// Post delete event listener
ui.posts.addEventListener('click', deletePost);

// Cancel edit event listener
ui.postSubmit.parentElement.addEventListener('click', handleCancelEdit);
