let blogContainer = document.querySelector('.blog-container')
let postButton = document.querySelector('button')
let blogTitle = document.getElementById('post-title')
let blogContent = document.getElementById('new-post-content')
let publishButton = document.getElementById('publish-btn')




const newPostHandler = async (event) => {
    event.preventDefault();
    // Send a POST request to the API endpoint

    const response = await fetch('/api/blog/', {
        method: 'POST',
        body: JSON.stringify({
            blog_title: blogTitle.value.trim(),
            blog_content: blogContent.value.trim(),
            date_posted: dayjs().unix()*1000,
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