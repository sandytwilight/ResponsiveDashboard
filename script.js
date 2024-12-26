// Fetch and display user summary and posts
async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    
    const postList = document.getElementById('post-list');
    posts.forEach(post => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${post.title}</span>
        <button onclick="viewPost(${post.id})">View</button>
        <button onclick="deletePost(${post.id})">Delete</button>
      `;
      postList.appendChild(listItem);
    });
  }
  
  // Redirect to post details page
  function viewPost(postId) {
    window.location.href = `post-details.html?postId=${postId}`;
  }
  
  // Delete post
  async function deletePost(postId) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: 'DELETE' });
    alert('Post deleted successfully');
    location.reload();
  }
  
  fetchPosts();
  