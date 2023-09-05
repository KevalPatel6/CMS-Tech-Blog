let blogContainer = document.querySelector('.blog-container')
let postButton = document.querySelector('button')
let blogTitle = document.getElementById('post-title').value
let blogContent = document.getElementById('new-post-content').value
let publishButton = document.getElementById('publish-btn')
const dayjs = require('dayjs')



const newPostHandler = async (event) => {
    event.preventDefault();
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/', {
        method: 'POST',
        body: JSON.stringify({
            blog_title: blogTitle,
            blog_content: blogContent,
            date_posted: dayjs().format('MM/DD/YYY h/mm A'),
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
    } else {
        alert('Unable to Create a New Blog Post, please try again!');
    }
}

postButton.addEventListener('click', newPostHandler)