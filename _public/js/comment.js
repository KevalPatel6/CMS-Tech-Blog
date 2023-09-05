const comment = document.getElementById('comment-content')
const blogID = document.querySelector('.blog-title').getAttribute('data-id')

const newCommentHandler = async (event)=>{
    event.preventDefault();

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            content: comment,
            date_posted: dayjs().unix()*1000,
            user_id: req.session.userID,
            blog_id: blogID,
        })
    })

    if(response.ok){
        document.location.reload();
    }
}