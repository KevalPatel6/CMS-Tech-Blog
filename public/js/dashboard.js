let postButton = document.querySelector('button')

postButton.addEventListener('click', ()=>{
    const newPostURL = '/newPost'

    window.location.href = newPostURL
})