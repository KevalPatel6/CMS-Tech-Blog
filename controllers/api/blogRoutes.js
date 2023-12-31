const router = require('express').Router();
const { Blog, User, Comment} = require('../../models');
const authenticate = require('../../utils/authenticate');

//Post New Blog//
router.post('/', authenticate, async (req,res)=>{
    try {
        const blogs = await Blog.create({
            ...req.body,
            user_id: req.session.userID
        })
        res.json(blogs)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Service Error, unable to post your blog, please try again.'})
    }

})


router.get('/', authenticate, async (req, res)=>{
    try {
        const blogs = await Blog.findAll()

        blogs.map(blog => blog.get({plain:true}))

        res.json(blogs)
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error, could not retrieve blogs'})
    }
})


router.delete('/', authenticate, async (req, res)=>{
    try {
        const deletedBlog = await Blog.destroy()
        res.json(deletedBlog)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error, unable to delete this blog, please try again'})
    }
})

//Still need to do update//

// router.put()


module.exports = router;