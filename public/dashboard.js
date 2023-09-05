let blogContainer = document.querySelector('.blog-container')
let postButton = document.querySelector('button')

const newBlogPostHandler = async (event) => {
    event.preventDefault();

        const response = await fetch('/api/blog', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          alert('Failed to login');
        }
}




postButton.addEventListener('click', )