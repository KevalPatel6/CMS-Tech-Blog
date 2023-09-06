let blogTitle = document.querySelector('.blog-title')

blogTitle.addEventListener('click', async (event) => {
    let blogTitleID = event.target.getAttribute('data-id')
    let response = await fetch(`/blog/:id${blogTitleID}`,{
        method: 'GET',
    });
    if(response.ok){
        document.location.replace('/comment')
    }
});
