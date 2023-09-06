
const comment = document.getElementById('comment-content')
const blogID = document.querySelector('.blog-title').getAttribute('data-id')
const submitButton = document.querySelector('button')
const userID = document.getElementById('post-info').getAttribute('data-id')


getComments();


const newCommentHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            content: comment.value.trim(),
            blog_id: blogID,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        document.location.reload();
    }

}

async function getComments (){
    let response = await fetch('/api/comment',{
        method: 'GET',
    })
}

submitButton.addEventListener('click', newCommentHandler)