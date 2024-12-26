const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
let post = null; // To store the fetched post details

// Function to fetch post details based on postId from query parameters
async function fetchPostDetails() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');

    if (!postId) {
        alert('Post ID is missing in the URL!');
        window.location.href = 'index.html'; // Redirect back to the dashboard
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post details');
        post = await response.json();

        // Populate the UI with post details
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-body').value = post.body;
    } catch (error) {
        console.error('Error fetching post details:', error);
        alert('Error fetching post details.');
        window.location.href = 'index.html'; // Redirect back to the dashboard
    }
}

// Function to save post changes
async function savePostChanges() {
    if (!post) {
        alert('Post details are not loaded.');
        return;
    }

    const updatedBody = document.getElementById('post-body').value;

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...post, body: updatedBody }),
        });

        if (response.ok) {
            // Store the updated post in localStorage
            const updatedPost = { ...post, body: updatedBody };
            localStorage.setItem(`updatedPost-${post.id}`, JSON.stringify(updatedPost));

            alert('Post updated successfully');
            window.location.href = 'index.html'; // Redirect to dashboard
        } else {
            alert('Failed to update post');
        }
    } catch (error) {
        console.error('Error saving changes:', error);
        alert('Error saving changes.');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchPostDetails(); // Fetch and display the post details
    document.getElementById('save-button').addEventListener('click', savePostChanges);
});
